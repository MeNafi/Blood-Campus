import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiSearch } from "react-icons/fi";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hook/UseAxiosSecure";
import DonorCardWide from "../../components/DonorCardWide/DonorCardWide";
import { addUnavailableDonor, cleanupExpiredUnavailable, getRemainingDays, removeUnavailableDonor } from "../../utils/donorAvailability";


const DonorList = () => {
  const axiosSecure = UseAxiosSecure();
  const [locationData, setLocationData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBlood, setSelectedBlood] = useState("");
  const [unavailableMap, setUnavailableMap] = useState({});
  const [listMode, setListMode] = useState("able");
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const [filters, setFilters] = useState({ city: "", area: "", subArea: "" });


  useEffect(() => {
    fetch("/location.json")
      .then((res) => res.json())
      .then((data) => setLocationData(data))
      .catch((err) => console.error("Error loading locations:", err));
    setUnavailableMap(cleanupExpiredUnavailable());
  }, []);


  const { data: response, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["donorList", filters, selectedBlood],
    queryFn: async () => {
      const activeParams = Object.fromEntries(
        Object.entries({ ...filters, bloodGroup: selectedBlood }).filter(([, value]) => value !== "")
      );
      const res = await axiosSecure.get("/donor/find-donor", { params: activeParams });
      return res.data;
    },
  });


  const donorList = useMemo(() => {
    if (Array.isArray(response?.data?.donors)) return response.data.donors;
    if (Array.isArray(response?.donors)) return response.donors;
    if (Array.isArray(response?.data)) return response.data;
    return [];
  }, [response]);

  const availableDonors = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return donorList
      .filter((donor) => !unavailableMap[donor?._id])
      .filter((donor) => {
        if (!term) return true;
        const searchable = [donor?.bloodGroup, donor?.fullName, donor?.name, donor?.department, donor?.email]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return searchable.includes(term);
      });
  }, [donorList, unavailableMap, searchTerm]);


  const unableDonors = useMemo(() => donorList.filter((donor) => unavailableMap[donor?._id]), [donorList, unavailableMap]);
  const currentList = listMode === "able" ? availableDonors : unableDonors;

  if (isError) {
    return (
      <div className="alert alert-error">
        <span>Error: {error?.message || "Failed to fetch donors"}</span>
      </div>
    );
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "city") {
        next.area = "";
        next.subArea = "";
      }
      if (name === "area") next.subArea = "";
      return next;
    });
  };

  const handleToggleUnavailable = (donor) => {
    const donorId = donor?._id;
    if (!donorId) return;
    if (unavailableMap[donorId]) {
      setUnavailableMap(removeUnavailableDonor(donorId));
      return;
    }

    Swal.fire({
      icon: "question",
      title: "Move to unable donor?",
      text: "Donor will stay unavailable for 3 months.",
      showCancelButton: true,
      confirmButtonColor: "#FF2C2C",
    })
     .then((result) => {
      if (result.isConfirmed) setUnavailableMap(addUnavailableDonor(donorId));
    });
  };

  
  return (
    <div className="min-h-screen bg-brand-bg pb-12">
      <div className="bg-primary px-4 pb-16 pt-10 text-center">
        <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">All List</h1>
        <p className="font-medium text-red-100">Manage able/unable donors with smart cooldown control.</p>
      </div>

      <div className="container mx-auto -mt-10 px-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xl md:p-7">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-2xl font-bold text-primary">Blood Group Filter</h2>
            <div className="flex w-full overflow-hidden rounded-lg border border-primary/30 lg:max-w-md">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by blood group or donor name..."
                className="w-full px-4 py-2 text-sm outline-none"
              />
              <button type="button" className="bg-primary px-4 text-white">
                <FiSearch />
              </button>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-4 gap-2 sm:flex sm:flex-wrap">
            {bloodGroups.map((bg) => (
              <button
                key={bg}
                onClick={() => setSelectedBlood((prev) => (prev === bg ? "" : bg))}
                className={`rounded-lg border px-4 py-2 text-sm font-semibold ${selectedBlood === bg ? "border-primary bg-primary text-white" : "border-primary/40 bg-white text-gray-700"}`}
              >
                {bg}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <select name="city" value={filters.city} onChange={handleFilterChange} className="select select-bordered w-full rounded-xl bg-gray-50">
              <option value="">Select City</option>
              {Object.keys(locationData).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <select name="area" value={filters.area} onChange={handleFilterChange} className="select select-bordered w-full rounded-xl bg-gray-50" disabled={!filters.city}>
              <option value="">Select Area</option>
              {filters.city &&
                Object.keys(locationData[filters.city] || {}).map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
            </select>
            <select name="subArea" value={filters.subArea} onChange={handleFilterChange} className="select select-bordered w-full rounded-xl bg-gray-50" disabled={!filters.area}>
              <option value="">Select Sector</option>
              {filters.area &&
                (locationData[filters.city]?.[filters.area] || []).map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
            </select>
          </div>

          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-2">
              {isFetching && <span className="loading loading-spinner loading-xs text-primary" />}
              <p className="text-sm text-gray-500">Found {currentList.length} donors</p>
            </div>
            <div className="join">
              <button
                onClick={() => setListMode("able")}
                className={`btn btn-sm join-item ${listMode === "able" ? "bg-primary text-white" : "bg-white text-gray-700"}`}
              >
                Able
              </button>
              <button
                onClick={() => setListMode("unable")}
                className={`btn btn-sm join-item ${listMode === "unable" ? "bg-gray-800 text-white" : "bg-white text-gray-700"}`}
              >
                Unable
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto mt-8 px-4">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 w-full animate-pulse rounded-2xl border border-gray-100 bg-white" />
            ))}
          </div>
        ) : currentList.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {currentList.map((donor) => (
              <DonorCardWide
                key={donor._id}
                donor={donor}
                isUnavailable={listMode === "unable"}
                remainingDays={getRemainingDays(unavailableMap[donor?._id]?.availableAt)}
                onToggleUnavailable={handleToggleUnavailable}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed bg-white py-24 text-center">
            <h3 className="text-xl font-bold text-gray-800">No matches found</h3>
            <p className="text-gray-500">Try another blood group or update search text.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DonorList;
