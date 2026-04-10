import React, { useState, useEffect } from "react";
import UseAxiosSecure from "../../Hook/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DonorCardWide from "../../components/DonorCardWide/DonorCardWide";

const FindDonor = () => {
  const axiosSecure = UseAxiosSecure();
  const [locationData, setLocationData] = useState({});
  const [filters, setFilters] = useState({
    bloodGroup: "",
    city: "",
    area: "",
    subArea: "",
  });

  useEffect(() => {
    fetch("/location.json")
      .then((res) => res.json())
      .then((data) => setLocationData(data))
      .catch((err) => console.error("Error loading locations:", err));
  }, []);

  const { data: response, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["donors", filters],
    queryFn: async () => {
      const activeParams = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value !== "")
      );
      const res = await axiosSecure.get("/donor/find-donor", { params: activeParams });
      return res.data;
    },
  });

  const donorList = response?.data?.donors || [];

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

  return (
    <div className="min-h-screen bg-brand-bg pb-12">
      <div className="bg-primary px-4 pb-24 pt-12 text-center">
        <h1 className="mb-2 text-4xl font-black tracking-tighter text-white italic">DONOR RADAR</h1>
        <p className="font-medium text-red-100 opacity-90">Filter by location to find immediate help</p>
      </div>

      <div className="container mx-auto -mt-10 px-4">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl md:p-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="ml-1 text-xs font-bold uppercase text-gray-400">Blood Group</label>
              <select
                name="bloodGroup"
                value={filters.bloodGroup}
                onChange={handleFilterChange}
                className="select select-bordered w-full rounded-xl bg-gray-50"
              >
                <option value="">All Groups</option>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-xs font-bold uppercase text-gray-400">City</label>
              <select name="city" value={filters.city} onChange={handleFilterChange} className="select select-bordered w-full rounded-xl bg-gray-50">
                <option value="">Select City</option>
                {Object.keys(locationData).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-xs font-bold uppercase text-gray-400">Area</label>
              <select
                name="area"
                value={filters.area}
                onChange={handleFilterChange}
                className="select select-bordered w-full rounded-xl bg-gray-50"
                disabled={!filters.city}
              >
                <option value="">Select Area</option>
                {filters.city &&
                  Object.keys(locationData[filters.city] || {}).map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-xs font-bold uppercase text-gray-400">Sub-Area</label>
              <select
                name="subArea"
                value={filters.subArea}
                onChange={handleFilterChange}
                className="select select-bordered w-full rounded-xl bg-gray-50"
                disabled={!filters.area}
              >
                <option value="">Select Sector</option>
                {filters.area &&
                  (locationData[filters.city]?.[filters.area] || []).map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-2">
              {isFetching && <span className="loading loading-spinner loading-xs text-primary" />}
              <p className="text-sm font-medium text-gray-400">Found {donorList.length} donors</p>
            </div>
            <button
              onClick={() => setFilters({ bloodGroup: "", city: "", area: "", subArea: "" })}
              className="btn btn-ghost btn-sm rounded-lg text-primary hover:bg-red-50"
            >
              Reset
            </button>
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
        ) : donorList.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {donorList.map((donor) => (
              <DonorCardWide key={donor._id} donor={donor} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed bg-white py-24 text-center">
            <h3 className="text-xl font-bold text-gray-800">No matches found</h3>
            <p className="text-gray-500">Try changing your location or blood group.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default FindDonor;