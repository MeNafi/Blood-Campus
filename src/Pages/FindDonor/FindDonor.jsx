import React, { useState, useEffect } from 'react';
import UseAxiosSecure from '../../Hook/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import DonorCardWide from '../../components/DonorCardWide/DonorCardWide';

const FindDonor = () => {
    const axiosSecure = UseAxiosSecure();
    
    const [locationData, setLocationData] = useState({});
    const [filters, setFilters] = useState({
        bloodGroup: '',
        city: '',
        area: '',
        subArea: ''
    });

    useEffect(() => {
        fetch('/location.json')
            .then(res => res.json())
            .then(data => setLocationData(data))
            .catch(err => console.error("Error loading locations:", err));
    }, []);

 // Add 'isError' inside the curly braces
const { data: response, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["donors", filters], 
    queryFn: async () => {
        const activeParams = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== "")
        );
        const res = await axiosSecure.get('/donor/find-donor', { 
            params: activeParams 
        });
        return res.data;
    }
});

if (isError) {
    return (
        <div className="alert alert-error">
            <span>Error: {error?.message || "Failed to fetch donors"}</span>
        </div>
    );
}
    const donorList = response?.data?.donors || [];

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => {
            const newFilters = { ...prev, [name]: value };
            if (name === 'city') { newFilters.area = ''; newFilters.subArea = ''; }
            if (name === 'area') { newFilters.subArea = ''; }
            return newFilters;
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="bg-red-600 pt-12 pb-24 px-4 text-center">
                <h1 className="text-4xl font-black text-white mb-2 italic tracking-tighter">DONOR RADAR</h1>
                <p className="text-red-100 opacity-90 font-medium">Filter by location to find immediate help</p>
            </div>

            <div className="container mx-auto px-4 -mt-12">
                <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        
                        {/* Blood Group */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Blood Group</label>
                            <select name="bloodGroup" value={filters.bloodGroup} onChange={handleFilterChange} className="select select-bordered w-full bg-gray-50 rounded-xl focus:ring-2 focus:ring-red-500">
                                <option value="">All Groups</option>
                                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                            </select>
                        </div>

                        {/* City Filter */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">City</label>
                            <select name="city" value={filters.city} onChange={handleFilterChange} className="select select-bordered w-full bg-gray-50 rounded-xl">
                                <option value="">Select City</option>
                                {Object.keys(locationData).map(city => <option key={city} value={city}>{city}</option>)}
                            </select>
                        </div>

                        {/* Area Filter */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Area</label>
                            <select name="area" value={filters.area} onChange={handleFilterChange} className="select select-bordered w-full bg-gray-50 rounded-xl" disabled={!filters.city}>
                                <option value="">Select Area</option>
                                {filters.city && Object.keys(locationData[filters.city] || {}).map(area => <option key={area} value={area}>{area}</option>)}
                            </select>
                        </div>

                        {/* Sub-Area Filter */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Sub-Area</label>
                            <select name="subArea" value={filters.subArea} onChange={handleFilterChange} className="select select-bordered w-full bg-gray-50 rounded-xl" disabled={!filters.area}>
                                <option value="">Select Sector</option>
                                {filters.area && locationData[filters.city][filters.area].map(sub => <option key={sub} value={sub}>{sub}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center border-t pt-4">
                        <div className="flex items-center gap-2">
                            {isFetching && <span className="loading loading-spinner loading-xs text-red-600"></span>}
                            <p className="text-sm text-gray-400 font-medium">Found {donorList.length} donors</p>
                        </div>
                        <button onClick={() => setFilters({bloodGroup:'', city:'', area:'', subArea:''})} className="btn btn-ghost btn-sm text-red-500 hover:bg-red-50 rounded-lg">Reset</button>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 mt-12">
                {isError ? (
                    <div className="alert alert-error text-white">Error: {error.message}</div>
                ) : isLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => <div key={i} className="h-28 w-full bg-white rounded-2xl animate-pulse border border-gray-100"></div>)}
                    </div>
                ) : donorList.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {donorList.map(donor => <DonorCardWide key={donor._id} donor={donor} />)}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed">
                        <h3 className="text-xl font-bold text-gray-800">No matches found</h3>
                        <p className="text-gray-500">Try changing your location or blood group.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default FindDonor;