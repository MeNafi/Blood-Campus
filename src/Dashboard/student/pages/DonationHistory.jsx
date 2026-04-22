import React, { useState, useEffect } from "react";
import { Plus, Calendar, Trash2, Pencil } from "lucide-react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2"; 
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";
import UseAuth from "../../../Hook/UseAuth";

const DonationHistory = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [editId, setEditId] = useState(null); 
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [hospital, setHospital] = useState("");
  const [note, setNote] = useState("");

  // 1. Fetch History logic
  useEffect(() => {
    let isMounted = true;
    if (user?.email) {
      setLoading(true);
      // Route matches: router.route("/history/:email").get(getDonationHistory)
      axiosSecure.get(`/donor/history/${user.email}`)
        .then(res => {
          if(isMounted) {
            setItems(res.data.data || []);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
          if(isMounted) setLoading(false);
        });
    }
    return () => { isMounted = false };
  }, [user?.email, axiosSecure]);

  const openModal = (item = null) => {
    if (item) {
      setEditId(item._id);
      setDate(new Date(item.date).toISOString().slice(0, 10));
      setHospital(item.hospital);
      setNote(item.note || "");
    } else {
      setEditId(null);
      setDate(new Date().toISOString().slice(0, 10));
      setHospital("");
      setNote("");
    }
    document.getElementById("add_donation_modal").showModal();
  };

  const closeModal = () => document.getElementById("add_donation_modal").close();

 const handleAddDonation = async () => {
  if (!hospital.trim()) return toast.error("Hospital name is required");

  const donationData = {
    email: user.email,
    date,
    hospital,
    note,
    // Ensure this date calculation is handled correctly
    nextAvailableDate: new Date(new Date(date).getTime() + 90 * 24 * 60 * 60 * 1000)
  };

  try {
    let res;
    if (editId) {
      // CHANGED: /donors -> /donor
      res = await axiosSecure.patch(`/donor/update-history/${editId}`, donationData);
      toast.success("Record updated!");
    } else {
      // CHANGED: /donors -> /donor
      res = await axiosSecure.post("/donor/add-history", donationData);
      toast.success("Donation record added!");
    }
    
    if (res.data.data) {
      setItems(res.data.data); 
      closeModal();
    }
  } catch (err) {
    // If the backend sends an ApiError, it will be caught here
    toast.error(err.response?.data?.message || "Something went wrong");
  }
};


  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete Record?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
      customClass: { popup: "rounded-[2rem]" }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Route matches: router.route("/delete-history/:historyId").delete(deleteDonationHistory)
          // Note: Passing email in query as required by your controller
          const res = await axiosSecure.delete(`/donor/delete-history/${id}?email=${user.email}`);
          setItems(res.data.data);
          toast.success("Deleted successfully");
        } catch (err) {
          toast.error("Failed to delete");
        }
      }
    });
  };


  if (loading) return (
    <div className="flex justify-center p-20">
        <span className="loading loading-dots loading-lg text-red-600"></span>
    </div>
  );


  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight italic">DONATION LOGS</h1>
            <p className="mt-1 text-sm text-gray-500">Track your life-saving impacts.</p>
          </div>
          <button onClick={() => openModal()} className="btn rounded-2xl border-none bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-100">
            <Plus size={18} />
            Record Donation
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {items && items.length > 0 ? items.map((item, idx) => (
          <div key={item._id || idx} className="rounded-2xl border border-gray-100 bg-white p-5 hover:border-red-200 transition-all shadow-sm group">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    {new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </h4>
                  <p className="text-sm text-gray-600 font-medium italic">at {item.hospital}</p>
                  {item.note && <p className="mt-2 text-xs text-gray-400">Note: {item.note}</p>}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button onClick={() => openModal(item)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Pencil size={18} />
                </button>
                <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
             <p className="text-gray-400 font-medium">No donation records found yet.</p>
          </div>
        )}
      </div>


      <dialog id="add_donation_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-0 rounded-3xl overflow-hidden bg-white">
          <div className="bg-red-600 p-8 text-white">
            <h3 className="text-2xl font-black italic tracking-tighter uppercase">
               {editId ? "Edit Impact" : "Add New Impact"}
            </h3>
            <p className="text-red-100 text-sm opacity-90">Recording this will set your availability to 90 days from the selected date.</p>
          </div>

          <div className="p-8 space-y-5">
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">Donation Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input input-bordered mt-2 w-full rounded-xl focus:border-red-600" />
            </div>
            
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">Hospital / Location</label>
              <input type="text" placeholder="e.g. Dhaka Medical College" value={hospital} onChange={(e) => setHospital(e.target.value)} className="input input-bordered mt-2 w-full rounded-xl" />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">Private Note</label>
              <textarea placeholder="Any specific info..." value={note} onChange={(e) => setNote(e.target.value)} className="textarea textarea-bordered mt-2 w-full rounded-xl h-24" />
            </div>


            <div className="flex gap-3 pt-2">
              <button onClick={closeModal} className="btn flex-1 rounded-xl border-gray-200 bg-white text-gray-600">Discard</button>
              <button onClick={handleAddDonation} className="btn flex-1 rounded-xl border-none bg-red-600 text-white hover:bg-red-700">
                {editId ? "Update Record" : "Save Record"}
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default DonationHistory;