import React from "react";

const VerificationQueue = () => {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gray-900">Verification Queue</h1>
        <p className="mt-2 text-sm text-gray-600">Approve new registrations before they appear in Find Blood.</p>
      </div>
      <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-600 shadow-sm">
        Pending approvals will render here in the next step.
      </div>
    </section>
  );
};

export default VerificationQueue;

