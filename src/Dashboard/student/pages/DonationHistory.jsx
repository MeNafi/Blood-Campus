import React from "react";
import { Plus, Trash2 } from "lucide-react";
import EmptyState from "../../components/EmptyState";
import { addDonationEntry, formatDate, getDonationHistory, removeDonationEntry, setUnableUntil } from "../../utils/availability";

const DonationHistory = () => {
  const [items, setItems] = React.useState(() => getDonationHistory());
  const [date, setDate] = React.useState("");
  const [note, setNote] = React.useState("");

  const openModal = () => {
    const el = document.getElementById("add_donation_modal");
    if (el?.showModal) el.showModal();
  };

  const closeModal = () => {
    const el = document.getElementById("add_donation_modal");
    if (el?.close) el.close();
  };

  const add = () => {
    const next = addDonationEntry({ date: date || new Date().toISOString().slice(0, 10), note });
    setItems(next);
    const until = Date.now() + 90 * 24 * 60 * 60 * 1000;
    setUnableUntil({ until, reason: "recently_donated" });
    setDate("");
    setNote("");
    closeModal();
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Donation History</h1>
            <p className="mt-2 text-sm text-gray-600">Add donations to compute cooldown and track impact.</p>
          </div>
          <button type="button" onClick={openModal} className="btn rounded-2xl border-none bg-primary text-white hover:bg-red-600">
            <Plus size={18} />
            Add donation
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="No donation history yet"
          description="When you complete a donation, add it here to help calculate your next available date."
          action={
            <button type="button" onClick={openModal} className="btn rounded-2xl border-none bg-primary text-white hover:bg-red-600">
              Add your first donation
            </button>
          }
        />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-gray-900">{formatDate(item.date)}</p>
                  {item.note ? <p className="mt-1 text-sm text-gray-600">{item.note}</p> : <p className="mt-1 text-xs text-gray-400">No note</p>}
                </div>
                <button
                  type="button"
                  onClick={() => setItems(removeDonationEntry(item.id))}
                  className="btn btn-ghost btn-sm rounded-xl text-red-600 hover:bg-red-50"
                  aria-label="Remove donation"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <dialog id="add_donation_modal" className="modal">
        <div className="modal-box rounded-3xl">
          <h3 className="text-lg font-black text-gray-900">Add donation</h3>
          <p className="mt-2 text-sm text-gray-600">This will also apply the 90-day cooldown by default.</p>

          <div className="mt-5 space-y-4">
            <div>
              <label className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">Donation date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input input-bordered mt-2 w-full rounded-2xl" />
            </div>
            <div>
              <label className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">Note (optional)</label>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} className="textarea textarea-bordered mt-2 w-full rounded-2xl" placeholder="Hospital / recipient / any info..." />
            </div>
          </div>

          <div className="modal-action">
            <button type="button" onClick={closeModal} className="btn rounded-2xl border border-gray-200 bg-white hover:bg-gray-50">
              Cancel
            </button>
            <button type="button" onClick={add} className="btn rounded-2xl border-none bg-primary text-white hover:bg-red-600">
              Save
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button aria-label="Close">close</button>
        </form>
      </dialog>
    </section>
  );
};

export default DonationHistory;

