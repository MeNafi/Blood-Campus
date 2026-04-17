import React from "react";

const About = () => {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">About</p>
        <h1 className="mt-1 text-3xl font-black text-gray-900">BloodCampus</h1>
        <p className="mt-2 max-w-3xl text-sm text-gray-600">
          BloodCampus is a university-centric blood donation platform designed to connect verified students and donors
          during emergencies, safely and fast.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-900">Mission</h2>
          <p className="mt-2 text-sm text-gray-600">
            Our mission is to reduce response time during critical blood requests by enabling structured search,
            availability visibility, and campus trust signals.
          </p>

          <h2 className="mt-6 text-lg font-bold text-gray-900">Safety guidelines</h2>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>- Always verify identity (DIU email / student ID) before meeting.</li>
            <li>- Prefer public locations and campus health facilities for coordination.</li>
            <li>- Share only required contact info. Avoid posting sensitive details publicly.</li>
          </ul>

          <h2 className="mt-6 text-lg font-bold text-gray-900">Eligibility</h2>
          <p className="mt-2 text-sm text-gray-600">
            Eligibility depends on health conditions and local medical guidelines. If you are on medication or recently
            donated, set your status to Unable and provide a duration.
          </p>
        </div>

        <div className="rounded-2xl border border-primary/10 bg-primary/5 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">Emergency contact</h2>
          <p className="mt-2 text-sm text-gray-700">
            If this is a medical emergency, contact local emergency services first.
          </p>
          <div className="mt-4 rounded-2xl bg-white p-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">Campus helpdesk</p>
            <p className="mt-2 text-sm font-bold text-gray-900">DIU Health Center</p>
            <p className="mt-1 text-sm text-gray-600">Phone: (add official number)</p>
            <p className="mt-1 text-sm text-gray-600">Email: health@diu.edu.bd</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

