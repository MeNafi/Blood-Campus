import React from "react";
import { Link } from "react-router";
import { HeartHandshake } from "lucide-react";

const Goodbye = () => {
  return (
    <section className="min-h-[70vh] px-4 py-16">
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <HeartHandshake size={24} />
        </div>
        <h1 className="mt-4 text-3xl font-black text-gray-900">Sorry to see you go</h1>
        <p className="mt-3 text-sm text-gray-600">
          Your account deletion request has been processed. Thank you for supporting the BloodCampus mission.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/" className="btn rounded-2xl border-none bg-primary text-white hover:bg-red-600">
            Back to Home
          </Link>
          <Link to="/register" className="btn rounded-2xl border border-gray-200 bg-white hover:bg-gray-50">
            Create a new account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Goodbye;

