import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useOutletContext } from "react-router";
import { Search, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";

const DonorManagement = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const ctx = useOutletContext();
  const headerSearch = String(ctx?.dashboardSearch || "");

  const [search, setSearch] = React.useState("");
  const [limit, setLimit] = React.useState(10); 

  React.useEffect(() => {
    if (headerSearch) setSearch(headerSearch);
  }, [headerSearch]);

  
  const { data: response, isLoading, isError } = useQuery({
    queryKey: ["adminDonorManagement", limit],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donor/find-donor?limit=${limit}`);
      return res.data;
    },
  });

  const deleteDonorMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/donor/delete-donor/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminDonorManagement"]);
      toast.success("Donor permanently removed.");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to remove donor.");
    },
  });

  const donors = React.useMemo(() => response?.data?.donors ?? [], [response]);
  const totalInDB = response?.data?.total ?? 0; 

  const filtered = React.useMemo(() => {
    const term = search.trim().toLowerCase();
    return donors.filter((d) => {
      if (!term) return true;
      const hay = [d?.fullName, d?.name, d?.email, d?.bloodGroup, d?.department, d?.phone].filter(Boolean).join(" ").toLowerCase();
      return hay.includes(term);
    });
  }, [donors, search]);

  const removeDonor = async (donor) => {
    const result = await Swal.fire({
      icon: "error",
      title: "Remove donor permanently?",
      text: `Delete ${donor.fullName || 'this donor'}?`,
      showCancelButton: true,
      confirmButtonColor: "#FF2C2C",
    });

    if (result.isConfirmed) {
      deleteDonorMutation.mutate(donor._id);
    }
  };

  return (
    <section className="space-y-6 pb-10">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gray-900">Donor Management</h1>
        <p className="mt-2 text-sm text-gray-600">Moderate active donor accounts.</p>
      </div>

      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 shadow-sm sm:max-w-md">
            <Search size={16} className="text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email..."
              className="w-full bg-transparent text-sm text-gray-900 outline-none"
            />
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          {isError ? (
            <div className="p-4 text-red-700">Failed to load donors.</div>
          ) : isLoading && donors.length === 0 ? (
            <div className="space-y-3 py-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 w-full animate-pulse rounded-2xl bg-gray-100" />
              ))}
            </div>
          ) : (
            <>
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Blood</th>
                    <th>Department</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-10 text-gray-400 font-bold">No results found</td>
                    </tr>
                  ) : (
                    filtered.map((d) => (
                      <tr key={d._id}>
                        <td>
                          <div>
                            <p className="font-bold text-gray-900">{d?.fullName || d?.name || "Anonymous"}</p>
                            <p className="text-xs text-gray-500">{d?.email}</p>
                          </div>
                        </td>
                        <td className="font-bold text-primary">{d?.bloodGroup || "—"}</td>
                        <td className="text-sm text-gray-700">{d?.department || "—"}</td>
                        <td className="text-right">
                          <button 
                            onClick={() => removeDonor(d)} 
                            className="btn btn-sm rounded-xl border-none bg-primary text-white hover:bg-red-600"
                            disabled={deleteDonorMutation.isLoading}
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

            
              {donors.length < totalInDB && !search && (
                <div className="mt-6 flex justify-center">
                  <button 
                    onClick={() => setLimit(prev => prev + 10)}
                    className="btn btn-outline border-gray-200 text-gray-600 hover:bg-primary hover:border-primary hover:text-white rounded-2xl px-8"
                  >
                    {isLoading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default DonorManagement;