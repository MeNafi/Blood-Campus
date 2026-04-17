import React from "react";
import { CalendarClock, CircleAlert } from "lucide-react";
import { getAvailability, getNextAvailableLabel, setAbleNow, setUnableUntil } from "../../utils/availability";

const reasons = [
  { id: "recently_donated", label: "Recently donated" },
  { id: "on_medication", label: "On medication" },
  { id: "sick", label: "Not feeling well" },
  { id: "traveling", label: "Traveling / unavailable" },
  { id: "other", label: "Other" },
];

const durations = [
  { id: "7d", label: "7 days", days: 7 },
  { id: "14d", label: "14 days", days: 14 },
  { id: "30d", label: "30 days", days: 30 },
  { id: "90d", label: "90 days (donation cooldown)", days: 90 },
];

const DonationStatusCard = () => {
  const [availability, setAvailabilityState] = React.useState(() => getAvailability());
  const [reason, setReason] = React.useState("recently_donated");
  const [durationId, setDurationId] = React.useState("90d");
  const [customUntil, setCustomUntil] = React.useState("");

  React.useEffect(() => {
    const onStorage = (e) => {
      if (!e.key) return;
      if (e.key.includes("bloodCampusStudentAvailability")) setAvailabilityState(getAvailability());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const status = availability?.status || "able";
  const nextAvailable = getNextAvailableLabel(availability);

  const openModal = () => {
    const el = document.getElementById("donation_status_modal");
    if (el?.showModal) el.showModal();
  };

  const closeModal = () => {
    const el = document.getElementById("donation_status_modal");
    if (el?.close) el.close();
  };

  const handleToggle = (checked) => {
    if (checked) {
      openModal();
      return;
    }
    const next = setAbleNow();
    setAvailabilityState(next);
  };

  const handleConfirmUnable = () => {
    const duration = durations.find((d) => d.id === durationId);
    const msFromDuration = Date.now() + (duration?.days || 90) * 24 * 60 * 60 * 1000;
    const custom = customUntil ? Date.parse(customUntil) : NaN;
    const until = Number.isFinite(custom) ? custom : msFromDuration;
    const next = setUnableUntil({ until, reason });
    setAvailabilityState(next);
    closeModal();
  };

  return (
    <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">Donation status</p>
          <p className="mt-1 text-2xl font-black text-gray-900">{status === "unable" ? "Unable" : "Able"}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1">
              <CalendarClock size={16} className="text-primary" />
              Next available: <span className="font-semibold text-gray-900">{nextAvailable}</span>
            </span>
            {status === "unable" && availability?.reason ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-amber-700">
                <CircleAlert size={16} />
                {reasons.find((r) => r.id === availability.reason)?.label || "Temporarily unavailable"}
              </span>
            ) : null}
          </div>
        </div>

        <label className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
          <span className="text-sm font-bold text-gray-800">Mark as unable</span>
          <input
            type="checkbox"
            className="toggle toggle-error"
            checked={status === "unable"}
            onChange={(e) => handleToggle(e.target.checked)}
          />
        </label>
      </div>

      <dialog id="donation_status_modal" className="modal">
        <div className="modal-box rounded-3xl">
          <h3 className="text-lg font-black text-gray-900">Set as Unable</h3>
          <p className="mt-2 text-sm text-gray-600">This will move you to the inactive pool until your availability returns.</p>

          <div className="mt-5 space-y-4">
            <div>
              <label className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">Reason</label>
              <select value={reason} onChange={(e) => setReason(e.target.value)} className="select select-bordered mt-2 w-full rounded-2xl">
                {reasons.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">Duration</label>
                <select value={durationId} onChange={(e) => setDurationId(e.target.value)} className="select select-bordered mt-2 w-full rounded-2xl">
                  {durations.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">Or choose date</label>
                <input type="date" value={customUntil} onChange={(e) => setCustomUntil(e.target.value)} className="input input-bordered mt-2 w-full rounded-2xl" />
              </div>
            </div>
          </div>

          <div className="modal-action">
            <button type="button" onClick={() => setAbleNow() && setAvailabilityState(getAvailability())} className="btn rounded-2xl border border-gray-200 bg-white hover:bg-gray-50">
              Keep Able
            </button>
            <button type="button" onClick={handleConfirmUnable} className="btn rounded-2xl border-none bg-primary text-white hover:bg-red-600">
              Confirm
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button aria-label="Close">close</button>
        </form>
      </dialog>
    </div>
  );
};

export default DonationStatusCard;

