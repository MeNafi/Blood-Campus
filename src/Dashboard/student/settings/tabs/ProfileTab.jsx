import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Camera, BadgeCheck } from "lucide-react";
import UseAuth from "../../../../Hook/UseAuth";
import SettingsSkeleton from "../components/SettingsSkeleton";
import StickySaveBar from "../components/StickySaveBar";
import { useSettingsApi } from "../settingsApi";

const schema = z.object({
  fullName: z.string().trim().min(2, "Name is required"),
  bio: z.string().trim().max(280, "Bio must be under 280 characters").optional().or(z.literal("")),
  email: z.string().email("Invalid email"),
  profileImage: z.string().optional().or(z.literal("")),
});

const normalizeMe = (me, fallbackUserEmail) => {
  const source = me?.data || me || {};
  return {
    fullName: source?.fullName || source?.name || "",
    bio: source?.bio || "",
    email: source?.email || fallbackUserEmail || "",
    profileImage: source?.profileImage || source?.profilePhoto || "",
    emailVerified: Boolean(source?.emailVerified ?? true),
  };
};

const ProfileTab = () => {
  const { user } = UseAuth();
  const api = useSettingsApi();
  const qc = useQueryClient();

  const meQuery = useQuery({
    queryKey: ["settingsMe"],
    queryFn: api.getMe,
    retry: 1,
  });

  const normalized = React.useMemo(() => normalizeMe(meQuery.data, user?.email), [meQuery.data, user?.email]);

  const form = useForm({
    resolver: zodResolver(schema),
    values: {
      fullName: normalized.fullName,
      bio: normalized.bio,
      email: normalized.email,
      profileImage: normalized.profileImage,
    },
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: api.updateMe,
    onMutate: async (payload) => {
      await qc.cancelQueries({ queryKey: ["settingsMe"] });
      const prev = qc.getQueryData(["settingsMe"]);
      qc.setQueryData(["settingsMe"], (old) => {
        const oldNorm = normalizeMe(old, user?.email);
        return { ...old, data: { ...oldNorm, ...payload } };
      });
      return { prev };
    },
    onError: (err, _payload, ctx) => {
      if (ctx?.prev) qc.setQueryData(["settingsMe"], ctx.prev);
      toast.error(err?.message || "Profile update failed");
    },
    onSuccess: () => {
      toast.success("Profile updated successfully.");
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["settingsMe"] });
    },
  });

  const dirty = form.formState.isDirty;
  const saving = mutation.isPending;

  const onSubmit = form.handleSubmit(async (data) => {
    await mutation.mutateAsync({
      fullName: data.fullName,
      bio: data.bio,
      email: data.email,
      profileImage: data.profileImage,
    });
    form.reset(data);
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isImage = file.type.startsWith("image/");
    const isTooLarge = file.size > 2 * 1024 * 1024;
    if (!isImage || isTooLarge) {
      toast.error("Upload a valid image (max 2MB).");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => form.setValue("profileImage", String(reader.result || ""), { shouldDirty: true });
    reader.readAsDataURL(file);
  };

  if (meQuery.isLoading) return <SettingsSkeleton />;
  if (meQuery.isError) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">Profile</h2>
        <p className="mt-2 text-sm text-gray-600">Couldn’t load your profile from the server.</p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Profile</h2>
              <p className="mt-1 text-sm text-gray-600">Public-facing information and personal details.</p>
            </div>
            <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              Auto-save: Off
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-50 ring-2 ring-primary/15">
                {form.watch("profileImage") ? (
                  <img src={form.watch("profileImage")} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs font-bold text-gray-300">IMG</div>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Profile picture</p>
                <p className="mt-1 text-xs text-gray-600">JPG/PNG/WebP up to 2MB.</p>
              </div>
            </div>
            <label className="btn rounded-2xl border border-gray-200 bg-white hover:bg-gray-50">
              <Camera size={18} />
              Upload
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </label>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">Full name</label>
              <input className="input input-bordered mt-2 w-full rounded-2xl" {...form.register("fullName")} placeholder="Your name" />
              {form.formState.errors.fullName ? <p className="mt-1 text-xs text-red-600">{form.formState.errors.fullName.message}</p> : null}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">Email</label>
                <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] font-bold text-gray-700">
                  <BadgeCheck size={14} className="text-emerald-600" />
                  {normalized.emailVerified ? "Verified" : "Unverified"}
                </span>
              </div>
              <input className="input input-bordered mt-2 w-full rounded-2xl" {...form.register("email")} placeholder="name@diu.edu.bd" />
              {form.formState.errors.email ? <p className="mt-1 text-xs text-red-600">{form.formState.errors.email.message}</p> : null}
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-extrabold uppercase tracking-[0.22em] text-gray-400">Bio</label>
              <textarea className="textarea textarea-bordered mt-2 w-full rounded-2xl" {...form.register("bio")} rows={4} placeholder="A short bio (optional)..." />
              {form.formState.errors.bio ? <p className="mt-1 text-xs text-red-600">{form.formState.errors.bio.message}</p> : null}
              <p className="mt-2 text-xs text-gray-500">{(form.watch("bio") || "").length}/280</p>
            </div>
          </div>
        </div>
      </form>

      <StickySaveBar
        show={dirty}
        saving={saving}
        onSave={onSubmit}
        onReset={() => form.reset()}
      />
    </>
  );
};

export default ProfileTab;

