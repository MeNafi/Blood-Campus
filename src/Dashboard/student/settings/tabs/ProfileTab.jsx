import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Camera, Droplets, MapPin, Weight, User, Zap, Hash, Phone, Building, Scale, Info } from "lucide-react";
import UseAuth from "../../../../Hook/UseAuth";
import UseAxiosSecure from "../../../../Hook/UseAxiosSecure";

const ProfileTab = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  // 1. Fetching Data
  const { data: donor, isLoading } = useQuery({
    queryKey: ["donorProfile", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donor/get-profile/${user?.email}`);
      return data.data;
    },
    enabled: !!user?.email,
    staleTime: 1000 * 60 * 5,
  });

  const { register, handleSubmit, watch, reset, formState: { isDirty } } = useForm({
    values: useMemo(() => donor, [donor]),
  });

  // 2. Instant Sync Mutation
  const mutation = useMutation({
    mutationFn: async (newData) => {
      const { data } = await axiosSecure.patch(`/donor/update-profile/${user?.email}`, newData);
      return data.data;
    },
    onSuccess: () => {
      toast.success("Profile Synced");
      queryClient.invalidateQueries(["donorProfile", user?.email]);
    },
    onError: (err) => toast.error(err.response?.data?.message || "Sync Failed"),
  });

  if (isLoading) return <div className="flex h-96 items-center justify-center"><span className="loading loading-spinner loading-lg text-red-600"></span></div>;

  return (
    <div className="mx-auto max-w-5xl pb-32">
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
        
        {/* TOP SECTION: IDENTITY & AVATAR */}
        <div className="flex flex-col md:flex-row gap-6 items-center bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden bg-red-50 ring-4 ring-white shadow-lg">
              {watch("avatar") ? (
                <img src={watch("avatar")} className="w-full h-full object-cover" alt="Avatar" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-red-200"><User size={48} /></div>
              )}
            </div>
            <label className="absolute -bottom-2 -right-2 bg-red-600 p-3 rounded-2xl text-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
              <Camera size={20} />
              <input type="file" className="hidden" />
            </label>
          </div>

          <div className="flex-1 space-y-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
                <input {...register("fullName")} className="w-full bg-gray-50 p-4 rounded-2xl font-bold text-gray-800 outline-none focus:ring-2 focus:ring-red-500/20 transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Student ID</label>
                <input {...register("studentId")} className="w-full bg-gray-50 p-4 rounded-2xl font-bold text-gray-800 outline-none focus:ring-2 focus:ring-red-500/20 transition-all" />
              </div>
            </div>
          </div>
        </div>

        {/* CORE DETAILS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Phone */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="bg-blue-50 p-3 rounded-2xl text-blue-600"><Phone size={20} /></div>
            <div className="flex-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Phone</label>
              <input {...register("phone")} className="w-full bg-transparent font-bold text-gray-800 outline-none" />
            </div>
          </div>

          {/* Weight */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="bg-orange-50 p-3 rounded-2xl text-orange-600"><Scale size={20} /></div>
            <div className="flex-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Weight (kg)</label>
              <input type="number" {...register("weight")} className="w-full bg-transparent font-bold text-gray-800 outline-none" />
            </div>
          </div>

          {/* Blood Group (Disabled - Identity based) */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-4 opacity-70">
            <div className="bg-red-50 p-3 rounded-2xl text-red-600"><Droplets size={20} /></div>
            <div className="flex-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Blood Group</label>
              <input value={donor?.bloodGroup || ""} disabled className="w-full bg-transparent font-bold text-gray-800 outline-none" />
            </div>
          </div>

          {/* Department */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="bg-purple-50 p-3 rounded-2xl text-purple-600"><Building size={20} /></div>
            <div className="flex-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Department</label>
              <select {...register("department")} className="w-full bg-transparent font-bold text-gray-800 outline-none appearance-none">
                {["CSE", "SWE", "EEE", "Pharmacy", "BBA", "Other"].map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Gender */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-600"><User size={20} /></div>
            <div className="flex-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Gender</label>
              <select {...register("gender")} className="w-full bg-transparent font-bold text-gray-800 outline-none appearance-none">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${watch("isAvailable") ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}>
                <Zap size={20} fill={watch("isAvailable") ? "currentColor" : "none"} />
              </div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Available</label>
            </div>
            <input type="checkbox" {...register("isAvailable")} className="toggle toggle-error" />
          </div>

          {/* Address - Full Width */}
          <div className="sm:col-span-2 lg:col-span-3 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex gap-4">
            <div className="bg-gray-50 p-3 h-fit rounded-2xl text-gray-600"><MapPin size={20} /></div>
            <div className="flex-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Present Address</label>
              <textarea {...register("presentAddress")} className="w-full bg-transparent font-bold text-gray-800 outline-none min-h-[60px] resize-none" />
            </div>
          </div>
        </div>

        {/* FLOATING ACTION BAR */}
        {isDirty && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-gray-900/90 backdrop-blur-xl p-4 rounded-[2rem] flex items-center justify-between shadow-2xl animate-in fade-in slide-in-from-bottom-4 border border-white/10">
            <div className="flex items-center gap-3 px-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <p className="text-xs font-bold text-white uppercase tracking-tighter">Modified Changes</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => reset()} className="btn btn-ghost btn-sm text-gray-400 hover:text-white capitalize">Discard</button>
              <button type="submit" disabled={mutation.isPending} className="btn btn-sm bg-white text-black hover:bg-gray-200 border-none rounded-xl px-6 capitalize">
                {mutation.isPending ? 'Saving...' : 'Update Profile'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileTab;