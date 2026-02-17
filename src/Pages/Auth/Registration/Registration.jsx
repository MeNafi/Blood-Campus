import React from "react";
import { useForm } from "react-hook-form";
import bgImg from "../../../assets/main_big_pic.png";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa"; // Icon for Name
import { AiOutlineEyeInvisible } from "react-icons/ai";
import UseAuth from "../../../Hook/UseAuth";
import { useNavigate } from "react-router";

const Registration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const {registerWithEmail} = UseAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Registration Data:", data);
    if(data.password === data.confirmPassword){
      registerWithEmail(data.email, data.password)
      .then((res)=>{
        console.log(res)
        navigate('/');
      })
      .catch(error=>{
        console.log(error)
        alert(error.message)
      })
    }
  };

  // Watch password to compare with confirm password
  const password = watch("password");

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-10"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Semi-transparent Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-[500px] bg-rose-50/90 rounded-[32px] p-8 md:p-14 shadow-2xl border border-white">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-11 h-11 bg-[#ef4444] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              <div className="w-6 h-6 border-2 border-white rounded-sm flex items-center justify-center">
                <span className="text-white text-[10px]">❤️</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-[#ef4444] tracking-tight">
              BloodCampus
            </h1>
          </div>
          <p className="text-gray-800 text-lg font-medium">
            Login to find donors quickly
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-semibold text-gray-700 text-lg">
                Name
              </span>
            </label>

            <div className="relative">
              <FaRegUser className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 text-xl z-10" />

              <input
                type="text"
                placeholder="Enter your name...."
                className={`input w-full h-14 pl-12 rounded-2xl bg-white border-2 focus:outline-none transition-all ${
                  errors.name
                    ? "border-red-500"
                    : "border-red-400/50 focus:border-red-500"
                }`}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
              />
            </div>

            {/* Error Message */}
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-semibold text-gray-700 text-lg">
                University Email
              </span>
            </label>

            <div className="relative">
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 text-2xl z-10" />

              <input
                type="email"
                placeholder="Enter your university email....."
                className={`input w-full h-14 pl-12 rounded-2xl bg-white border-2 focus:outline-none transition-all ${
                  errors.email
                    ? "border-red-500"
                    : "border-red-400/50 focus:border-red-500"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@diu\.edu\.bd$/,
                    message: "Must use your DIU email (@diu.edu.bd)",
                  },
                })}
              />
            </div>

            {/* Show Error Message */}
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-semibold text-gray-700 text-lg">
                Password
              </span>
            </label>
            <div className="relative">
              <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 text-2xl z-10" />
              <input
                type="password"
                placeholder="Enter a 6 digit password....."
                className={`input w-full h-14 pl-12 pr-12 rounded-2xl bg-white border-2 focus:outline-none transition-all ${
                  errors.password
                    ? "border-red-500"
                    : "border-red-400/50 focus:border-red-500"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "6 characters required" },
                })}
              />
              <AiOutlineEyeInvisible className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl cursor-pointer" />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-semibold text-gray-700 text-lg">
                Confirm Password
              </span>
            </label>
            <div className="relative">
              <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 text-2xl z-10" />
              <input
                type="password"
                placeholder="Enter your password again....."
                className={`input w-full h-14 pl-12 pr-12 rounded-2xl bg-white border-2 focus:outline-none transition-all ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-red-400/50 focus:border-red-500"
                }`}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <AiOutlineEyeInvisible className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl cursor-pointer" />
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs mt-1 ml-2">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="btn w-full h-14 bg-[#ef4444] hover:bg-red-600 text-white border-none rounded-2xl text-xl font-bold shadow-lg capitalize tracking-wide mt-4"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="divider before:bg-gray-300 after:bg-gray-300 my-6"></div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-700 text-lg">
            Already have an account ?{" "}
            <button className="text-[#ef4444] font-bold hover:underline">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
