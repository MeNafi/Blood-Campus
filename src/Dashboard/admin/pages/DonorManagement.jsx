import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router";
import { Search, Trash2, Ban } from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";
import { cleanupExpiredUnavailable, getRemainingDays, getUnavailableDonorMap } from "../../../utils/donorAvailability";

const DonorManagement = () => {
  const axiosSecure = UseAxiosSecure();
  const ctx = useOutletContext();
  const headerSearch = String(ctx?.dashboardSearch || "");

  const [statusFilter, setStatusFilter] = React.useState("all"); // all|able|unable
  const [search, setSearch] = React.useState("");
  const [unavailableMap, setUnavailableMap] = React.useState(() => cleanupExpiredUnavailable());

  React.useEffect(() => {
    setUnavailableMap(getUnavailableDonorMap());
  }, []);

  React.useEffect(() => {
    if (headerSearch) setSearch(headerSearch);
  }, [headerSearch]);

  const { data: response, isLoading, isError } = useQuery({
    queryKey: ["adminDonorManagement"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donor/find-donor");
      return res.data;
    },
  });

  const donors = React.useMemo(() => response?.data?.donors ?? [], [response]);

  const filtered = React.useMemo(() => {
    const term = search.trim().toLowerCase();
    return donors
      .filter((d) => {
        const isUnable = Boolean(unavailableMap[d?._id]);
        if (statusFilter === "able") return !isUnable;
        if (statusFilter === "unable") return isUnable;
        return true;
      })
      .filter((d) => {
        if (!term) return true;
        const hay = [d?.fullName, d?.name, d?.email, d?.bloodGroup, d?.department, d?.phone].filter(Boolean).join(" ").toLowerCase();
        return hay.includes(term);
      });
  }, [donors, unavailableMap, statusFilter, search]);

  const rejectDonor = async (donor) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Reject donor?",
      text: "This is a temporary suspension for verification issues (UI-only for now).",
      showCancelButton: true,
      confirmButtonColor: "#FF2C2C",
    });
    if (!result.isConfirmed) return;
    toast.success("Donor rejected (temporary).");
  };

  const removeDonor = async (donor) => {
    const result = await Swal.fire({
      icon: "error",
      title: "Remove donor permanently?",
      text: "This will permanently delete the donor (UI-only for now).",
      showCancelButton: true,
      confirmButtonColor: "#FF2C2C",
    });
    if (!result.isConfirmed) return;
    toast.success("Donor removed (permanent).");
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gray-900">Donor Management</h1>
        <p className="mt-2 text-sm text-gray-600">Search donors, filter by status, and take moderation actions.</p>
      </div>

      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 shadow-sm sm:max-w-md">
            <Search size={16} className="text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, department..."
              className="w-full bg-transparent text-sm text-gray-900 outline-none"
            />
          </div>
          <div className="join">
            <button onClick={() => setStatusFilter("all")} className={`btn join-item btn-sm ${statusFilter === "all" ? "bg-primary text-white" : "bg-white"}`}>All</button>
            <button onClick={() => setStatusFilter("able")} className={`btn join-item btn-sm ${statusFilter === "able" ? "bg-primary text-white" : "bg-white"}`}>Able</button>
            <button onClick={() => setStatusFilter("unable")} className={`btn join-item btn-sm ${statusFilter === "unable" ? "bg-gray-900 text-white" : "bg-white"}`}>Unable</button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          {isError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">Failed to load donors.</div>
          ) : isLoading ? (
            <div className="space-y-3 py-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 w-full animate-pulse rounded-2xl bg-gray-100" />
              ))}
            </div>
          ) : (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Blood</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5}>
                      <div className="rounded-2xl border-2 border-dashed bg-white py-14 text-center">
                        <p className="text-sm font-bold text-gray-900">No results found</p>
                        <p className="mt-1 text-xs text-gray-600">Try changing filters or search text.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((d) => {
                    const isUnable = Boolean(unavailableMap[d?._id]);
                    return (
                      <tr key={d._id}>
                        <td>
                          <div>
                            <p className="font-bold text-gray-900">{d?.fullName || d?.name || "Anonymous"}</p>
                            <p className="text-xs text-gray-500">{d?.email}</p>
                          </div>
                        </td>
                        <td className="font-bold text-primary">{d?.bloodGroup || "—"}</td>
                        <td className="text-sm text-gray-700">{d?.department || "—"}</td>
                        <td>
                          {isUnable ? (
                            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                              Unable ({getRemainingDays(unavailableMap[d._id]?.availableAt)}d)
                            </span>
                          ) : (
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Able</span>
                          )}
                        </td>
                        <td className="text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => rejectDonor(d)} className="btn btn-sm rounded-xl border border-gray-200 bg-white hover:bg-gray-50">
                              <Ban size={16} />
                              Reject
                            </button>
                            <button onClick={() => removeDonor(d)} className="btn btn-sm rounded-xl border-none bg-primary text-white hover:bg-red-600">
                              <Trash2 size={16} />
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

export default DonorManagement;

