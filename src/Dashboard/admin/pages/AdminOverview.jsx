import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  ResponsiveContainer, LineChart, Line, CartesianGrid, 
  XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, 
  Pie, Cell 
} from "recharts";
import { Users, Clock, Zap, Activity, Info } from "lucide-react";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";

const AdminOverview = () => {
  const axiosSecure = UseAxiosSecure();

  // 1. Fetching Analytics based on your backend controller
  const { data: analytics, isLoading, isError } = useQuery({
    queryKey: ["adminAnalytics"],
    queryFn: async () => {
      // Endpoint must match your router.route("/admin-analytics")
      const res = await axiosSecure.get("/donor/admin-analytics");
      
      /** * CRITICAL FIX: 
       * Your backend returns: { statusCode, data, message }
       * Axios returns: { data: { statusCode, data, message } }
       * So we return res.data.data to get the actual counts/arrays
       */
      return res.data.data; 
    },
    refetchOnWindowFocus: false,
  });

  // 2. Formatting Blood Group Distribution for the Pie Chart
  const pieData = useMemo(() => {
    if (!analytics?.bloodGroupDistribution) return [];
    return analytics.bloodGroupDistribution.map(item => ({
      name: item._id || "N/A",
      value: item.count
    }));
  }, [analytics]);

  const COLORS = ["#EF4444", "#3B82F6", "#F59E0B", "#10B981", "#6366F1", "#EC4899", "#8B5CF6", "#64748B"];

  if (isLoading) return <div className="h-96 flex items-center justify-center animate-pulse text-gray-400 font-black">SYNCING WITH DATABASE...</div>;
  if (isError) return <div className="p-10 bg-red-50 text-red-600 rounded-3xl">Failed to load analytics. Check backend connection.</div>;

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-black italic tracking-tighter text-gray-900 uppercase">System Analytics</h1>
        <p className="text-sm font-medium text-gray-500">Live data overview of the BloodCampus platform.</p>
      </div>

      {/* Top Stat Cards - Linked to your countDocuments() results */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          icon={<Users size={20} />} 
          title="Total Donors" 
          value={analytics?.totalDonors} 
          sub="Registered in system" 
        />
        <StatCard 
          icon={<Clock size={20} />} 
          title="Pending Review" 
          value={analytics?.pendingVerification} 
          sub="Requires approval" 
        />
        <StatCard 
          icon={<Zap size={20} />} 
          title="Today's Requests" 
          value={analytics?.requestsToday} 
          sub="New emergency posts" 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Growth Chart - Uses your growthData aggregate */}
        <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
          <h3 className="mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Weekly Registration Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics?.growthData || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis dataKey="_id" stroke="#9CA3AF" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="count" stroke="#EF4444" strokeWidth={4} dot={{ r: 4, fill: "#EF4444" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Blood Group Pie Chart - Uses your bloodGroupDistribution aggregate */}
        <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
          <h3 className="mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Donor Distribution</h3>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="h-64 w-full md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={5}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Custom Legend */}
            <div className="grid grid-cols-2 gap-2 w-full md:w-1/2">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2 p-2 rounded-xl bg-gray-50/50 border border-gray-100">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-xs font-bold text-gray-700">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card
const StatCard = ({ icon, title, value, sub }) => (
  <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-red-100">
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
      {icon}
    </div>
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{title}</p>
    <p className="text-4xl font-black tracking-tighter text-gray-900">{value ?? 0}</p>
    <p className="mt-1 text-xs font-bold text-gray-400 italic">{sub}</p>
  </div>
);

export default AdminOverview;