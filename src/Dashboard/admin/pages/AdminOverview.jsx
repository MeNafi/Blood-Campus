import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";

const AdminOverview = () => {
  const axiosSecure = UseAxiosSecure();

  const donorsQuery = useQuery({
    queryKey: ["adminDonors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donor/find-donor");
      return res.data;
    },
  });

  const donorList = React.useMemo(() => donorsQuery.data?.data?.donors ?? [], [donorsQuery.data]);

  const growth = React.useMemo(
    () => [
      { name: "Mon", visitors: 420 },
      { name: "Tue", visitors: 680 },
      { name: "Wed", visitors: 510 },
      { name: "Thu", visitors: 920 },
      { name: "Fri", visitors: 860 },
      { name: "Sat", visitors: 640 },
      { name: "Sun", visitors: 740 },
    ],
    [],
  );

  const impact = React.useMemo(
    () => [
      { name: "Week 1", donations: 24, requests: 38 },
      { name: "Week 2", donations: 31, requests: 42 },
      { name: "Week 3", donations: 28, requests: 36 },
      { name: "Week 4", donations: 44, requests: 51 },
    ],
    [],
  );

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const pieData = React.useMemo(() => {
    const counts = Object.fromEntries(bloodGroups.map((b) => [b, 0]));
    for (const d of donorList) {
      const bg = d?.bloodGroup;
      if (bg && counts[bg] !== undefined) counts[bg] += 1;
    }
    const items = bloodGroups.map((b) => ({ name: b, value: counts[b] }));
    const total = items.reduce((s, x) => s + x.value, 0);
    return total > 0 ? items : bloodGroups.map((b, idx) => ({ name: b, value: idx % 2 === 0 ? 12 : 8 }));
  }, [donorList]);

  const colors = ["#FF2C2C", "#FB7185", "#F59E0B", "#10B981", "#06B6D4", "#6366F1", "#A855F7", "#64748B"];

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gray-900">Admin Analytics</h1>
        <p className="mt-2 text-sm text-gray-600">Platform health, donor distribution, and impact metrics.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">Total donors</p>
          <p className="mt-2 text-3xl font-black text-gray-900">{donorList.length || "—"}</p>
          <p className="mt-1 text-sm text-gray-600">From your active donor directory.</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">Pending verification</p>
          <p className="mt-2 text-3xl font-black text-gray-900">8</p>
          <p className="mt-1 text-sm text-gray-600">Mock queue until backend exists.</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">Requests today</p>
          <p className="mt-2 text-3xl font-black text-gray-900">39</p>
          <p className="mt-1 text-sm text-gray-600">Demo metric.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold uppercase tracking-[0.22em] text-gray-400">Platform growth</h2>
            <span className="text-xs font-bold text-gray-500">Visitors</span>
          </div>
          <div className="mt-5 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Line type="monotone" dataKey="visitors" stroke="#FF2C2C" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold uppercase tracking-[0.22em] text-gray-400">Donation impact</h2>
            <span className="text-xs font-bold text-gray-500">Donations vs requests</span>
          </div>
          <div className="mt-5 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={impact}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Bar dataKey="donations" fill="#FF2C2C" radius={[8, 8, 0, 0]} />
                <Bar dataKey="requests" fill="#111827" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold uppercase tracking-[0.22em] text-gray-400">Blood group distribution</h2>
          <span className="text-xs font-bold text-gray-500">{donorsQuery.isLoading ? "Loading…" : "Derived from donors"}</span>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="h-72 lg:col-span-5">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} paddingAngle={2}>
                  {pieData.map((_, idx) => (
                    <Cell key={idx} fill={colors[idx % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {pieData.map((x, idx) => (
                <div key={x.name} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors[idx % colors.length] }} />
                    <p className="text-sm font-bold text-gray-900">{x.name}</p>
                  </div>
                  <p className="mt-2 text-2xl font-black text-gray-900">{x.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminOverview;

