import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaRegUser,
  FaIdCard,
  FaPhone,
  FaMapMarkerAlt,
  FaWeight,
  FaCamera,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import {
  MdOutlineBloodtype,
  MdOutlineBusinessCenter,
  MdOutlineTransgender,
  MdEventNote,
} from "react-icons/md";
import { useLoaderData } from "react-router";
import UseAxiosSecure from "../../Hook/UseAxiosSecure";
import Swal from "sweetalert2";

const DonorRegistration = () => {
  const [photoPreview, setPhotoPreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const axiosSecure = UseAxiosSecure();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const blockedWords = ["nude", "sex", "xxx", "porn", "nsfw", "vulgar"];
      const lowerName = file.name.toLowerCase();
      const isBlockedName = blockedWords.some((word) => lowerName.includes(word));
      const isImage = file.type.startsWith("image/");
      const isTooLarge = file.size > 2 * 1024 * 1024;

      if (!isImage || isTooLarge || isBlockedName) {
        Swal.fire({
          icon: "error",
          title: "Invalid image",
          text: "Please upload a clean profile image (jpg/png/webp) under 2MB.",
          confirmButtonColor: "#FF2C2C",
        });
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const fullAddress = `${data.sector}, ${data.area}, ${data.city}`;

    const finalData = {
      ...data,
      presentAddress: fullAddress,
      weight: Number(data.weight),
      totalDonations: 0,
      profileImage: photoPreview,
    };

    console.log("Donor Schema Ready Data:", finalData);
    try {
      const res = await axiosSecure.post("/donor/find-donor", finalData);
      alert("Successfully Created");
      console.log(res.data);
    } catch (err) {
      alert("Error: " + err.message);
      console.error(err);
    }
  };

  const addressData = useLoaderData();
  const watchCity = watch("city");
  const watchArea = watch("area");

  const labelStyle = "block text-[11px] font-bold text-gray-400 uppercase tracking-[2px] mb-2 ml-1";
  const inputStyle = "w-full h-12 pl-12 pr-4 rounded-xl bg-white border-2 border-gray-200 text-gray-700 text-sm focus:border-red-500 focus:bg-white outline-none transition-all duration-300 shadow-sm";
  const selectStyle = "w-full h-12 pl-12 pr-10 rounded-xl bg-white border-2 border-gray-200 text-gray-700 text-sm focus:border-red-500 focus:bg-white outline-none appearance-none cursor-pointer transition-all duration-300 shadow-sm";

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center py-12 px-4 font-sans text-gray-900">
      <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
        <div className="bg-gray-900 px-8 py-10 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white text-center md:text-left">
              Donor <span className="text-red-500">Registration</span>
            </h1>
            <p className="text-gray-400 text-sm mt-2">Complete your profile to start saving lives.</p>
          </div>
          <MdOutlineBloodtype className="text-6xl text-red-500 hidden md:block" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12 space-y-8">
          <div className="flex flex-col items-center justify-center space-y-4 pb-4 border-b border-gray-100">
            <div className="relative w-32 h-32 group">
              <div className="w-full h-full rounded-full border-4 border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center shadow-inner">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <FaRegUser className="text-4xl text-gray-300" />
                )}
              </div>
              <label className="absolute bottom-1 right-1 bg-red-600 p-3 rounded-full text-white cursor-pointer hover:bg-red-700 transition-colors shadow-lg">
                <FaCamera className="text-sm" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </label>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Upload Profile Photo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <label className={labelStyle}>Full Name</label>
              <FaRegUser className="absolute left-4 bottom-4 text-gray-400 group-focus-within:text-red-500" />
              <input type="text" placeholder="Rakib Ahmed" className={inputStyle} {...register("fullName", { required: true })} />
            </div>

            <div className="relative group">
              <label className={labelStyle}>Student ID</label>
              <FaIdCard className="absolute left-4 bottom-4 text-gray-400 group-focus-within:text-red-500" />
              <input type="text" placeholder="211-15-XXXX" className={inputStyle} {...register("studentId", { required: true })} />
            </div>

            <div className="relative group">
              <label className={labelStyle}>DIU Email</label>
              <HiOutlineMail className="absolute left-4 bottom-3.5 text-gray-400 text-lg group-focus-within:text-red-500" />
              <input type="email" placeholder="name@diu.edu.bd" className={inputStyle} {...register("email", { required: true, pattern: /@diu\.edu\.bd$/ })} />
            </div>

            <div className="relative group">
              <label className={labelStyle}>Phone Number</label>
              <FaPhone className="absolute left-4 bottom-4 text-gray-400 group-focus-within:text-red-500" />
              <input type="tel" placeholder="017XXXXXXXX" className={inputStyle} {...register("phone", { required: true })} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <label className={labelStyle}>Blood Group</label>
              <MdOutlineBloodtype className="absolute left-4 bottom-3.5 text-red-500 text-xl" />
              <select className={selectStyle} {...register("bloodGroup", { required: true })}>
                <option value="">Select</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (<option key={g} value={g}>{g}</option>))}
              </select>
            </div>

            <div className="relative">
              <label className={labelStyle}>Gender</label>
              <MdOutlineTransgender className="absolute left-4 bottom-3.5 text-gray-400 text-xl" />
              <select className={selectStyle} {...register("gender", { required: true })}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="relative group">
              <label className={labelStyle}>Weight (kg)</label>
              <FaWeight className="absolute left-4 bottom-4 text-gray-400" />
              <input type="number" placeholder="Min 50" className={inputStyle} {...register("weight", { required: true, min: 50 })} />
              {errors.weight && <span className="text-[10px] text-red-500 mt-1 ml-1 font-bold">Minimum 50kg required</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className={labelStyle}>Department</label>
              <MdOutlineBusinessCenter className="absolute left-4 bottom-3.5 text-gray-400 text-xl" />
              <select className={selectStyle} {...register("department", { required: true })}>
                <option value="">Choose Dept</option>
                {["CSE", "SWE", "EEE", "Pharmacy", "BBA", "English", "CIS", "ITM", "NFE", "MIS", "Other"].map((d) => (<option key={d} value={d}>{d}</option>))}
              </select>
            </div>

            <div className="relative group">
              <label className={labelStyle}>Last Donation Date</label>
              <MdEventNote className="absolute left-4 bottom-4 text-gray-400 text-lg" />
              <input type="date" className={inputStyle} {...register("lastDonationDate")} />
            </div>
          </div>

          <section className="bg-gray-50/80 p-6 rounded-3xl border-2 border-dashed border-gray-200">
            <label className="text-[12px] font-black text-gray-800 mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" /> PRESENT ADDRESS SELECTION
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select className={selectStyle + " pl-6"} {...register("city", { required: true })}>
                <option value="">Select City</option>
                {addressData && Object.keys(addressData).map((city) => (<option key={city} value={city}>{city}</option>))}
              </select>

              <select
                className={`${selectStyle} pl-6 ${(!watchCity || !addressData?.[watchCity]) && "opacity-50"}`}
                disabled={!watchCity || !addressData?.[watchCity]}
                {...register("area", { required: true })}
              >
                <option value="">Select Area</option>
                {watchCity && addressData?.[watchCity] && Object.keys(addressData[watchCity]).map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>

              <select
                className={`${selectStyle} pl-6 ${(!watchArea || !addressData?.[watchCity]?.[watchArea]) && "opacity-50"}`}
                disabled={!watchArea || !addressData?.[watchCity]?.[watchArea]}
                {...register("sector", { required: true })}
              >
                <option value="">Select Sector</option>
                {(addressData?.[watchCity]?.[watchArea] || []).map((sec) => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
            </div>
          </section>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-900 text-white p-6 rounded-2xl">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-400 uppercase">Privacy Mode:</span>
              <select className="bg-transparent font-bold text-red-500 focus:outline-none cursor-pointer" {...register("privacyMode")}>
                <option value="Public">Public</option>
                <option value="OnAccept">On Accept</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full h-16 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-sm font-black uppercase tracking-[2px] shadow-xl transition-all transform active:scale-[0.98]">
            Complete Donor Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonorRegistration;
