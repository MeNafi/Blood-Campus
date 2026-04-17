import React from "react";
import toast from "react-hot-toast";
import { ShieldCheck, KeyRound, Fingerprint } from "lucide-react";

const SecurityTab = () => {
  const [twoFa, setTwoFa] = React.useState(false);

  return (
    <section className="space-y-4">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">Security</h2>
        <p className="mt-1 text-sm text-gray-600">Protect your account with stronger authentication.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <KeyRound size={18} />
            </span>
            <div>
              <p className="text-sm font-bold text-gray-900">Password reset</p>
              <p className="mt-1 text-xs text-gray-600">Send a reset link to your email (mock).</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => toast.success("Password reset link sent (mock).")}
            className="btn mt-5 w-full rounded-2xl border border-gray-200 bg-white hover:bg-gray-50"
          >
            Send reset link
          </button>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Fingerprint size={18} />
            </span>
            <div>
              <p className="text-sm font-bold text-gray-900">Two-factor authentication</p>
              <p className="mt-1 text-xs text-gray-600">Add an extra layer of protection (mock).</p>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-primary" />
              <p className="text-sm font-bold text-gray-900">Enable 2FA</p>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-error"
              checked={twoFa}
              onChange={(e) => {
                setTwoFa(e.target.checked);
                toast.success(e.target.checked ? "2FA enabled (mock)." : "2FA disabled (mock).");
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityTab;

