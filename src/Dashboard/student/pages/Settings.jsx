import React from "react";
import { useForm } from "react-hook-form";
import { Camera, ShieldCheck } from "lucide-react";
import { getAvailability, getNextAvailableLabel } from "../../utils/availability";

const Settings = () => {
  const [photoPreview, setPhotoPreview] = React.useState(null);
  const [availability, setAvailability] = React.useState(() => getAvailability());
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      bloodGroup: "",
      nextAvailableOverride: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Settings submit:", { ...data, profileImage: photoPreview });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isImage = file.type.startsWith("image/");
    const isTooLarge = file.size > 2 * 1024 * 1024;
    if (!isImage || isTooLarge) {
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  React.useEffect(() => {
    const refresh = () => setAvailability(getAvailability());
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gray-900">Settings</h1>
        <p className="mt-2 text-sm text-gray-600">Manage your identity, availability, and security preferences.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-900">Identity management</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">Name</label>
              <input {...register("fullName")} className="input input-bordered mt-2 w-full rounded-2xl" placeholder="Your name" />
            </div>
            <div>
              <label className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">DIU Email</label>
              <input {...register("email")} className="input input-bordered mt-2 w-full rounded-2xl" placeholder="name@diu.edu.bd" />
            </div>
            <div>
              <label className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">Phone</label>
              <input {...register("phone")} className="input input-bordered mt-2 w-full rounded-2xl" placeholder="017XXXXXXXX" />
            </div>
            <div>
              <label className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">Blood group</label>
              <select {...register("bloodGroup")} className="select select-bordered mt-2 w-full rounded-2xl">
                <option value="">Select</option>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-bold text-gray-900">Availability logic</h2>
            <p className="mt-2 text-sm text-gray-600">
              Your next available date can be calculated from your last donation date and cooldown rules. You can also set an override.
            </p>
            <div className="mt-4 rounded-2xl border border-primary/10 bg-primary/5 p-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-500">Current</p>
              <p className="mt-2 text-sm font-bold text-gray-900">
                Status: <span className="text-primary">{availability?.status === "unable" ? "Unable" : "Able"}</span>
              </p>
              <p className="mt-1 text-sm text-gray-700">
                Next available: <span className="font-semibold text-gray-900">{getNextAvailableLabel(availability)}</span>
              </p>
            </div>
            <div className="mt-4">
              <label className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">Next available date override</label>
              <input type="date" {...register("nextAvailableOverride")} className="input input-bordered mt-2 w-full rounded-2xl" />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-bold text-gray-900">Security</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button type="button" className="rounded-2xl border border-gray-200 bg-white p-4 text-left hover:bg-gray-50">
                <p className="text-sm font-bold text-gray-900">Reset password</p>
                <p className="mt-1 text-xs text-gray-600">Mock flow (wire to Firebase later)</p>
              </button>
              <button type="button" className="rounded-2xl border border-gray-200 bg-white p-4 text-left hover:bg-gray-50">
                <p className="text-sm font-bold text-gray-900">Two-factor authentication</p>
                <p className="mt-1 text-xs text-gray-600">Mock toggle (coming soon)</p>
              </button>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button type="submit" className="btn rounded-2xl border-none bg-primary text-white hover:bg-red-600">
              Save changes
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">Profile picture</h2>
          <div className="mt-5 flex items-center gap-4">
            <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-50 ring-2 ring-primary/15">
              {photoPreview ? (
                <img src={photoPreview} alt="Profile preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-300">IMG</div>
              )}
            </div>
            <label className="btn rounded-2xl border border-gray-200 bg-white hover:bg-gray-50">
              <Camera size={18} />
              Upload
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </label>
          </div>
          <p className="mt-3 text-xs text-gray-500">JPG/PNG/WebP up to 2MB.</p>

          <div className="mt-8 rounded-2xl border border-primary/10 bg-primary/5 p-4">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck size={16} />
              <p className="text-sm font-bold text-gray-900">Verification</p>
            </div>
            <p className="mt-2 text-xs text-gray-600">
              Admin verification can be required before you appear publicly in Find Blood.
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Settings;

