import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { CheckCircle2, XCircle } from "lucide-react";

const VerificationQueue = () => {
  const [items, setItems] = React.useState(() => [
    { id: "v1", name: "Ahsan Habib", email: "habib23105341021@diu.edu.bd", dept: "CSE", submittedAt: "Today" },
    { id: "v2", name: "Nayeef Sarker", email: "nayeef@diu.edu.bd", dept: "SWE", submittedAt: "Yesterday" },
    { id: "v3", name: "Rakib Ahmed", email: "rakib@diu.edu.bd", dept: "EEE", submittedAt: "2 days ago" },
  ]);

  const approve = async (item) => {
    const res = await Swal.fire({
      icon: "question",
      title: "Approve registration?",
      text: "This will allow the donor to appear publicly (mock-first).",
      showCancelButton: true,
      confirmButtonColor: "#FF2C2C",
    });
    if (!res.isConfirmed) return;
    setItems((prev) => prev.filter((x) => x.id !== item.id));
    toast.success("Donor approved.");
  };

  const reject = async (item) => {
    const res = await Swal.fire({
      icon: "warning",
      title: "Reject registration?",
      text: "This will hold the donor for verification issues (mock-first).",
      showCancelButton: true,
      confirmButtonColor: "#FF2C2C",
    });
    if (!res.isConfirmed) return;
    setItems((prev) => prev.filter((x) => x.id !== item.id));
    toast.success("Donor rejected.");
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gray-900">Verification Queue</h1>
        <p className="mt-2 text-sm text-gray-600">Approve new registrations before they appear in Find Blood.</p>
      </div>

      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
        {items.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed bg-white py-20 text-center">
            <p className="text-sm font-bold text-gray-900">No pending registrations</p>
            <p className="mt-1 text-xs text-gray-600">New sign-ups will appear here for approval.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((it) => (
              <div key={it.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-black text-gray-900">{it.name}</p>
                    <p className="mt-1 text-xs text-gray-600">{it.email} • {it.dept} • submitted {it.submittedAt}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => reject(it)} className="btn rounded-2xl border border-gray-200 bg-white hover:bg-gray-50">
                      <XCircle size={18} className="text-gray-700" />
                      Reject
                    </button>
                    <button onClick={() => approve(it)} className="btn rounded-2xl border-none bg-primary text-white hover:bg-red-600">
                      <CheckCircle2 size={18} />
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default VerificationQueue;

