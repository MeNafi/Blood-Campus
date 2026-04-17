import React from "react";
import { Link } from "react-router";
import { Droplet, HeartPulse, CalendarClock, ArrowRight } from "lucide-react";
import EmptyState from "../../components/EmptyState";
import DonationStatusCard from "../components/DonationStatusCard";
import { getAvailability, getDonationHistory, getNextAvailableLabel } from "../../utils/availability";

const StatCard = ({ icon: Icon, label, value, hint }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">{label}</p>
        <p className="mt-2 text-2xl font-black text-gray-900">{value}</p>
        {hint ? <p className="mt-1 text-sm text-gray-600">{hint}</p> : null}
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon size={20} />
      </div>
    </div>
  </div>
);

const StudentOverview = () => {
  const [availability, setAvailability] = React.useState(() => getAvailability());
  const [historyCount, setHistoryCount] = React.useState(() => getDonationHistory().length);

  React.useEffect(() => {
    const refresh = () => {
      setAvailability(getAvailability());
      setHistoryCount(getDonationHistory().length);
    };
    refresh();
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">Welcome back</p>
            <h1 className="mt-1 text-3xl font-black text-gray-900">Your BloodCampus Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Update your donation status, find donors by hall/department, and keep your profile ready for emergencies.
            </p>
          </div>
          <Link to="/dashboard/find-blood" className="btn rounded-2xl border-none bg-primary text-white hover:bg-red-600">
            Find Blood
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <DonationStatusCard />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          icon={Droplet}
          label="Donation Status"
          value={availability?.status === "unable" ? "Unable" : "Able"}
          hint="This controls whether you appear as available."
        />
        <StatCard icon={CalendarClock} label="Next Available" value={getNextAvailableLabel(availability)} hint="Based on your status and cooldown." />
        <StatCard icon={HeartPulse} label="Impact" value={`${historyCount} donations`} hint="Mark donations to build your history." />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">Quick actions</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link to="/dashboard/settings" className="rounded-2xl border border-gray-200 bg-white p-4 text-left hover:bg-gray-50">
              <p className="text-sm font-bold text-gray-900">Update profile</p>
              <p className="mt-1 text-xs text-gray-600">Name, email, phone, blood group</p>
            </Link>
            <Link to="/dashboard/donation-history" className="rounded-2xl border border-gray-200 bg-white p-4 text-left hover:bg-gray-50">
              <p className="text-sm font-bold text-gray-900">Donation history</p>
              <p className="mt-1 text-xs text-gray-600">Track your activity</p>
            </Link>
          </div>
        </div>

        <EmptyState
          title="No recent activity"
          description="When you mark a donation or update status, it will appear here."
          action={
            <Link to="/dashboard/donation-history" className="btn rounded-2xl border-none bg-primary text-white hover:bg-red-600">
              View history
            </Link>
          }
        />
      </div>
    </section>
  );
};

export default StudentOverview;

