import React from "react";

const AdminOverview = () => {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gray-900">Admin Analytics</h1>
        <p className="mt-2 text-sm text-gray-600">Platform health, donor distribution, and impact metrics.</p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-600 shadow-sm">
        Charts will render here (Recharts) in the next step.
      </div>
    </section>
  );
};

export default AdminOverview;

