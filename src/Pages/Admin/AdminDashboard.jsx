import React from "react";
import UseAuth from "../../Hook/UseAuth";
import { Bell, Users, HeartPulse, ShieldCheck } from "lucide-react";


const AdminDashboard = () => {
  const { user } = UseAuth();

  
  return (
    <section className="min-h-screen bg-brand-bg py-10">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">Welcome, {user?.email}. Monitor your platform from one place.</p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <Users className="text-primary" size={20} />
              <p className="mt-3 text-sm text-gray-500">Total Students</p>
              <p className="text-2xl font-bold">1,284</p>
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <HeartPulse className="text-primary" size={20} />
              <p className="mt-3 text-sm text-gray-500">Active Donors</p>
              <p className="text-2xl font-bold">462</p>
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <Bell className="text-primary" size={20} />
              <p className="mt-3 text-sm text-gray-500">Requests Today</p>
              <p className="text-2xl font-bold">39</p>
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <ShieldCheck className="text-primary" size={20} />
              <p className="mt-3 text-sm text-gray-500">Verified Accounts</p>
              <p className="text-2xl font-bold">97%</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-xl border p-5">
              <h2 className="text-lg font-semibold">Recent Notifications</h2>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>New donor registration from CSE Department.</li>
                <li>Emergency request posted from Dhanmondi campus area.</li>
                <li>3 accounts pending profile verification.</li>
              </ul>
            </div>
            <div className="rounded-xl border p-5">
              <h2 className="text-lg font-semibold">Quick Actions</h2>
              <div className="mt-3 flex flex-wrap gap-3">
                <button className="btn btn-sm rounded-lg border-none bg-primary text-white hover:bg-red-600">Manage Users</button>
                <button className="btn btn-sm rounded-lg border-none bg-primary text-white hover:bg-red-600">Review Requests</button>
                <button className="btn btn-sm rounded-lg border-none bg-primary text-white hover:bg-red-600">Send Notice</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
