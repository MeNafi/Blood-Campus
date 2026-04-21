import React, { useState, useEffect } from "react";
import UseAxiosSecure from "../../Hook/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DonorCardWide from "../../components/DonorCardWide/DonorCardWide";

const FindDonor = () => {
  const axiosSecure = UseAxiosSecure();
  const [locationData, setLocationData] = useState({});
  const [donorList, setDonorList] = useState([]); 
  const [page, setPage] = useState(1); 
  
  const [filters, setFilters] = useState({
    bloodGroup: "",
    city: "",
    area: "",
    subArea: "",
  });

  // Location JSON Load
  useEffect(() => {
    fetch("/location.json")
      .then((res) => res.json())
      .then((data) => setLocationData(data))
      .catch((err) => console.error("Error loading locations:", err));
  }, []);


  const { data: response, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["donors", filters, page], 
    queryFn: async () => {
      const activeParams = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value !== "")
      );
      
      const res = await axiosSecure.get("/donor/find-donor", { 
        params: { ...activeParams, page, limit: 10 } 
      });
      return res.data;
    },
    keepPreviousData: true, 
  });

  // Accumulator Logic
  useEffect(() => {
    if (response?.data?.donors) {
      if (page === 1) {
        setDonorList(response.data.donors); 
      } else {
        setDonorList((prev) => [...prev, ...response.data.donors]); 
      }
    }
  }, [response, page]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setPage(1); 
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

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  // Controller theke asha hasNextPage check
  const hasMore = response?.data?.hasNextPage; 

  if (isError) {
    return (
      <div className="alert alert-error">
        <span>Error: {error?.message || "Failed to fetch donors"}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-12">
      <div className="bg-red-600 px-4 pb-24 pt-12 text-center">
        <h1 className="mb-2 text-4xl font-black tracking-tighter text-white italic underline">DONOR RADAR</h1>
        <p className="font-medium text-red-100 opacity-90 italic">Find the heroes around you</p>
      </div>

      <div className="container mx-auto -mt-10 px-4">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="ml-1 text-xs font-bold uppercase text-gray-400">Blood Group</label>
              <select name="bloodGroup" value={filters.bloodGroup} onChange={handleFilterChange} className="select select-bordered w-full rounded-xl bg-gray-50 border-gray-200">
                <option value="">All Groups</option>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (<option key={bg} value={bg}>{bg}</option>))}
              </select>
            </div>

            <div className="space-y-2">
                <label className="ml-1 text-xs font-bold uppercase text-gray-400">City</label>
                <select name="city" value={filters.city} onChange={handleFilterChange} className="select select-bordered w-full rounded-xl bg-gray-50 border-gray-200">
                    <option value="">Select City</option>
                    {Object.keys(locationData).map((city) => (<option key={city} value={city}>{city}</option>))}
                </select>
            </div>
            
          </div>

          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-2">
              {isFetching && <span className="loading loading-spinner loading-xs text-red-600" />}
              <p className="text-sm font-medium text-gray-400">Found {response?.data?.total || 0} donors</p>
            </div>
            <button
              onClick={() => { setFilters({ bloodGroup: "", city: "", area: "", subArea: "" }); setPage(1); }}
              className="text-sm font-bold text-red-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto mt-8 px-4">
        {isLoading && page === 1 ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 w-full animate-pulse rounded-2xl bg-gray-100" />
            ))}
          </div>
        ) : donorList.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 pb-10">
            {donorList.map((donor) => (
              <DonorCardWide 
                key={donor._id} 
                donor={donor} 
              />
            ))}
            
            {/* RED LOAD MORE BUTTON */}
            {hasMore && (
              <div className="flex justify-center pt-8 pb-10">
                <button 
                  onClick={handleLoadMore}
                  disabled={isFetching}
                  className="btn bg-[#ef4444] hover:bg-red-700 text-white border-none min-w-[220px] rounded-2xl shadow-xl transition-all duration-300"
                >
                  {isFetching ? (
                    <div className="flex items-center gap-2">
                      <span className="loading loading-spinner loading-sm"></span>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    <span className="font-bold tracking-wider uppercase">Load More Heroes</span>
                  )}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed bg-white py-24 text-center">
            <h3 className="text-xl font-bold text-gray-800 uppercase italic">No Hero Found!</h3>
            <p className="text-gray-500">Try changing location or blood group.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default FindDonor;