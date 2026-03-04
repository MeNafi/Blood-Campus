import React from "react";
import { useForm } from "react-hook-form";
import {
  FaRegUser,
  FaIdCard,
  FaPhone,
  FaMapMarkerAlt,
  FaChevronDown,
  FaWeight,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import {
  MdOutlineBloodtype,
  MdOutlineBusinessCenter,
  MdOutlineTransgender,
  MdEventNote,
} from "react-icons/md";
import { useLoaderData } from "react-router";

const axiosSecure = UseAxiosSecure

const DonorRegistration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Construct the address string from the cascading selects
    const fullAddress = `${data.sector}, ${data.area}, ${data.city}`;

    // Final object matching your Mongoose Schema
    const finalData = {
      ...data,
      presentAddress: fullAddress,
      weight: Number(data.weight), // Ensure number type
      totalDonations: 0,
    };

    console.log("Donor Schema Ready Data:", finalData);
    
  };

  const addressData = useLoaderData();

  const watchCity = watch("city");
  const watchArea = watch("area");

  // Style Variables
  const labelStyle =
    "block text-[11px] font-bold text-gray-400 uppercase tracking-[2px] mb-2 ml-1";
  const inputStyle =
    "w-full h-12 pl-12 pr-4 rounded-xl bg-white border-2 border-gray-200 text-gray-700 text-sm focus:border-red-500 focus:bg-white outline-none transition-all duration-300 shadow-sm";
  const selectStyle =
    "w-full h-12 pl-12 pr-10 rounded-xl bg-white border-2 border-gray-200 text-gray-700 text-sm focus:border-red-500 focus:bg-white outline-none appearance-none cursor-pointer transition-all duration-300 shadow-sm";

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center py-12 px-4 font-sans text-gray-900">
      <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 px-8 py-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white">
              Donor <span className="text-red-500">Registration</span>
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Complete your profile to start saving lives.
            </p>
          </div>
          <MdOutlineBloodtype className="text-6xl text-red-500 hidden md:block" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 md:p-12 space-y-8"
        >
          {/* Section 1: Basic & Academic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <label className={labelStyle}>Full Name</label>
              <FaRegUser className="absolute left-4 bottom-4 text-gray-400 group-focus-within:text-red-500" />
              <input
                type="text"
                placeholder="Rakib Ahmed"
                className={inputStyle}
                {...register("fullName", { required: true })}
              />
            </div>

            <div className="relative group">
              <label className={labelStyle}>Student ID</label>
              <FaIdCard className="absolute left-4 bottom-4 text-gray-400 group-focus-within:text-red-500" />
              <input
                type="text"
                placeholder="211-15-XXXX"
                className={inputStyle}
                {...register("studentId", { required: true })}
              />
            </div>

            <div className="relative group">
              <label className={labelStyle}>DIU Email</label>
              <HiOutlineMail className="absolute left-4 bottom-3.5 text-gray-400 text-lg group-focus-within:text-red-500" />
              <input
                type="email"
                placeholder="name@diu.edu.bd"
                className={inputStyle}
                {...register("email", {
                  required: true,
                  pattern: /@diu\.edu\.bd$/,
                })}
              />
            </div>

            <div className="relative group">
              <label className={labelStyle}>Phone Number</label>
              <FaPhone className="absolute left-4 bottom-4 text-gray-400 group-focus-within:text-red-500" />
              <input
                type="tel"
                placeholder="017XXXXXXXX"
                className={inputStyle}
                {...register("phone", { required: true })}
              />
            </div>
          </div>

          {/* Section 2: Medical Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <label className={labelStyle}>Blood Group</label>
              <MdOutlineBloodtype className="absolute left-4 bottom-3.5 text-red-500 text-xl" />
              <select
                className={selectStyle}
                {...register("bloodGroup", { required: true })}
              >
                <option value="">Select</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <label className={labelStyle}>Gender</label>
              <MdOutlineTransgender className="absolute left-4 bottom-3.5 text-gray-400 text-xl" />
              <select
                className={selectStyle}
                {...register("gender", { required: true })}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="relative group">
              <label className={labelStyle}>Weight (kg)</label>
              <FaWeight className="absolute left-4 bottom-4 text-gray-400" />
              <input
                type="number"
                placeholder="Min 50"
                className={inputStyle}
                {...register("weight", { required: true, min: 50 })}
              />
              {errors.weight && (
                <span className="text-[10px] text-red-500 mt-1 ml-1 font-bold">
                  Minimum 50kg required
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className={labelStyle}>Department</label>
              <MdOutlineBusinessCenter className="absolute left-4 bottom-3.5 text-gray-400 text-xl" />
              <select
                className={selectStyle}
                {...register("department", { required: true })}
              >
                <option value="">Choose Dept</option>
                {[
                  "CSE",
                  "SWE",
                  "EEE",
                  "Pharmacy",
                  "BBA",
                  "English",
                  "CIS",
                  "ITM",
                  "NFE",
                  "MIS",
                  "Other",
                ].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative group">
              <label className={labelStyle}>Last Donation Date</label>
              <MdEventNote className="absolute left-4 bottom-4 text-gray-400 text-lg" />
              <input
                type="date"
                className={inputStyle}
                {...register("lastDonationDate")}
              />
            </div>
          </div>

          {/* Section 3: Cascading Address */}
          <section className="bg-gray-50/80 p-6 rounded-3xl border-2 border-dashed border-gray-200">
            <label className="text-[12px] font-black text-gray-800 mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" /> PRESENT ADDRESS
              SELECTION
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* City Select */}
              <select
                className={selectStyle + " pl-6"}
                {...register("city", { required: true })}
              >
                <option value="">Select City</option>
                {addressData &&
                  Object.keys(addressData).map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>

              {/* Area Select - Added check for addressData[watchCity] */}
              <select
                className={`${selectStyle} pl-6 ${(!watchCity || !addressData?.[watchCity]) && "opacity-50"}`}
                disabled={!watchCity || !addressData?.[watchCity]}
                {...register("area", { required: true })}
              >
                <option value="">Select Area</option>
                {watchCity &&
                  addressData?.[watchCity] &&
                  Object.keys(addressData[watchCity]).map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
              </select>

              {/* Sector Select - Added safe navigation ?. and fallback empty array [] */}
              <select
                className={`${selectStyle} pl-6 ${(!watchArea || !addressData?.[watchCity]?.[watchArea]) && "opacity-50"}`}
                disabled={!watchArea || !addressData?.[watchCity]?.[watchArea]}
                {...register("sector", { required: true })}
              >
                <option value="">Select Sector</option>
                {(addressData?.[watchCity]?.[watchArea] || []).map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
                
              </select>
            </div>
          </section>

          {/* Section 4: Privacy */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-900 text-white p-6 rounded-2xl">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-400 uppercase">
                Privacy Mode:
              </span>
              <select
                className="bg-transparent font-bold text-red-500 focus:outline-none cursor-pointer"
                {...register("privacyMode")}
              >
                <option value="Public">Public</option>
                <option value="OnAccept">On Accept</option>
              </select>
            </div>

            <label className="flex items-center gap-4 cursor-pointer">
              <span className="text-xs font-bold text-gray-400 uppercase">
                Available Now?
              </span>
              <input
                type="checkbox"
                defaultChecked
                {...register("isAvailable")}
                className="w-5 h-5 accent-red-500"
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full h-16 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-sm font-black uppercase tracking-[2px] shadow-xl transition-all transform active:scale-[0.98]"
          >
            Complete Donor Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonorRegistration;
