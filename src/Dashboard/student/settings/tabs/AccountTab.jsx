import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Trash2, AlertCircle } from "lucide-react";
import UseAuth from "../../../../Hook/UseAuth";
import UseAxiosSecure from "../../../../Hook/UseAxiosSecure";

const AccountTab = () => {
  const { user, signOutUser, deleteAccount } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (email) => {
    setIsDeleting(true);
    const toastId = toast.loading("Purging data...");


    try {
      // 🔥 Axios POST request with email in body
      const res = await axiosSecure.post("/user/delete-account", { 
        email: email.trim().toLowerCase() 
      });


      if (res.data.success) {
        // Firebase Auth deletion (Account authentication clear korar jonno)
        if (user) {
          await deleteAccount(user);
        }
        

        toast.success("Account permanently deleted", { id: toastId });
        await signOutUser();
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || "Internal Server Error (500)";
      toast.error(errMsg, { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

  
  const confirmDelete = async () => {
    const userEmail = user?.email || "";
    
    const { value: confirmedEmail } = await Swal.fire({
      title: "Confirm Account Deletion",
      html: `<p class="text-sm text-gray-500">This will wipe all data. Type your email: <b>${userEmail}</b></p>`,
      input: "text",
      inputPlaceholder: "Enter email here",
      showCancelButton: true,
      confirmButtonText: "Delete Account",
      confirmButtonColor: "#dc2626",
      customClass: {
        popup: "rounded-[2rem]",
        confirmButton: "rounded-xl py-3 px-6",
        cancelButton: "rounded-xl py-3 px-6",
      },
      preConfirm: (input) => {
        if (input.trim().toLowerCase() !== userEmail.toLowerCase()) {
          Swal.showValidationMessage("Email mismatch!");
          return false;
        }
        return input;
      },
    });

    if (confirmedEmail) {
      handleDelete(confirmedEmail);
    }
  };

  return (
    <section className="w-full space-y-6">
      <div className="rounded-[2rem] border border-gray-100 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-black text-gray-900 tracking-tight">Account Settings</h2>
      </div>

      <div className="rounded-[2rem] border border-red-100 bg-red-50/40 p-6 sm:p-8 md:p-10 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600">
              <AlertCircle size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-red-600">Danger zone</p>
              <h3 className="text-lg font-bold text-gray-900 leading-tight">Delete Account</h3>
              <p className="max-w-md text-sm text-gray-600 leading-relaxed">
                Irreversible action. Your records will be removed from the server.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={confirmDelete}
            disabled={isDeleting}
            className="flex w-full md:w-auto items-center justify-center gap-2 rounded-2xl bg-red-600 px-10 py-4 text-base font-bold text-white transition-all hover:bg-red-700 active:scale-95 disabled:opacity-50"
          >
            {isDeleting ? <span className="loading loading-spinner loading-sm" /> : <><Trash2 size={18} /> Delete Account</>}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AccountTab;