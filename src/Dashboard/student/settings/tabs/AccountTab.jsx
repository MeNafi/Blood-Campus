import React from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import UseAuth from "../../../../Hook/UseAuth";
import { useSettingsApi } from "../settingsApi";

const AccountTab = () => {
  const { user, signOutUser } = UseAuth();
  const api = useSettingsApi();
  const navigate = useNavigate();

  const delMutation = useMutation({
    mutationFn: api.deleteMe,
    onSuccess: async () => {
      toast.success("Account deleted.");
      await signOutUser();
      navigate("/goodbye", { replace: true });
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to delete account. Please try again.");
    },
  });

  const confirmDelete = async () => {
    const email = user?.email || "";
    const { value } = await Swal.fire({
      title: "Delete account",
      html: `<p style="margin:0 0 10px 0; font-size:13px; color:#4b5563;">This will permanently remove your data. To confirm, type <b>DELETE</b>${email ? ` or <b>${email}</b>` : ""}.</p>`,
      input: "text",
      inputPlaceholder: "Type DELETE to confirm",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#FF2C2C",
      cancelButtonColor: "#9CA3AF",
      preConfirm: (text) => {
        const t = String(text || "").trim();
        if (t !== "DELETE" && (email ? t !== email : true)) {
          Swal.showValidationMessage("Please type DELETE (or your email) to confirm.");
          return false;
        }
        return t;
      },
    });

    if (!value) return;
    delMutation.mutate();
  };

  return (
    <section className="space-y-4">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">Account</h2>
        <p className="mt-1 text-sm text-gray-600">Plan, billing, and account lifecycle actions.</p>
      </div>

      <div className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-red-600">Danger zone</p>
            <h3 className="mt-1 text-lg font-black text-gray-900">Delete my data / account</h3>
            <p className="mt-2 text-sm text-gray-600">
              This action is permanent. You will be signed out and redirected to a feedback page.
            </p>
          </div>
          <button
            type="button"
            onClick={confirmDelete}
            className="btn rounded-2xl border-none bg-primary text-white hover:bg-red-600"
            disabled={delMutation.isPending}
          >
            {delMutation.isPending ? <span className="loading loading-spinner loading-sm" /> : null}
            Delete account
          </button>
        </div>
      </div>
    </section>
  );
};

export default AccountTab;

