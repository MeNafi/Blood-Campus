import React from "react";
import { useForm } from "react-hook-form";
import bgImg from "../../../assets/main_big_pic.png";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import UseAuth from "../../../Hook/UseAuth";
import { Link, useLocation, useNavigate } from "react-router";
import logo from "../../../assets/logo_Grp.png";
import Swal from "sweetalert2";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginWithEmail, resetPassword } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    loginWithEmail(data.email, data.password)
      .then((res) => {
        console.log(res);
        navigate(location?.state || "/");
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

const handleForgotPassword = async () => {
  const { value: email } = await Swal.fire({
    title: "Reset Password",
    html: `<p class="text-sm text-gray-500">Enter your <b>@diu.edu.bd</b> email to receive a reset link.</p>`,
    input: "email",
    inputPlaceholder: "your-id@diu.edu.bd",
    showCancelButton: true,
    confirmButtonText: "Send Link",
    confirmButtonColor: "#2563eb",
    showLoaderOnConfirm: true,
    customClass: {
      popup: "rounded-[2rem]",
      confirmButton: "rounded-xl py-3 px-6",
      cancelButton: "rounded-xl py-3 px-6",
    },
    preConfirm: async (inputEmail) => {
      // Logic for domain validation
      const diuDomain = "@diu.edu.bd";
      
      if (!inputEmail) {
        Swal.showValidationMessage("Please enter an email address");
        return false;
      }
      
      if (!inputEmail.toLowerCase().endsWith(diuDomain)) {
        Swal.showValidationMessage(`Only ${diuDomain} emails are allowed!`);
        return false;
      }

      try {
        await resetPassword(inputEmail);
        return inputEmail;
      } catch (error) {
        let errorMessage = "Could not send reset email.";
        if (error.code === 'auth/user-not-found') errorMessage = "No account found with this university email.";
        
        Swal.showValidationMessage(errorMessage);
        return false;
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });

  if (email) {
    Swal.fire({
      icon: "success",
      title: "Email Sent!",
      text: `Reset instructions sent to ${email}`,
      confirmButtonColor: "#2563eb",
      customClass: {
        popup: "rounded-[2rem]",
        confirmButton: "rounded-xl py-3 px-6",
      },
    });
  }
};

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>

      <div className="relative z-10 w-full max-w-[500px] bg-rose-50/90 rounded-[32px] p-8 md:p-14 shadow-2xl border border-white">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="flex items-center gap-2 mb-2">
            <img src={logo} alt="BloodCampus Logo" className="h-12 w-auto bg-red-600 rounded-2xl p-1" />
          </div>
          <p className="text-gray-800 text-lg font-medium">
            Login to find donors quickly
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-semibold text-gray-700 text-lg">
                Password
              </span>
            </label>
            <div className="relative">
              <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 text-2xl z-10" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your 6 digit password....."
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
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm mt-1 ml-2">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex justify-end pr-1">
            <button
              onClick={handleForgotPassword}
              type="button"
              className="text-[#ef4444] font-bold hover:underline text-lg"
            >
              Forgot password ?
            </button>
          </div>

          <button
            type="submit"
            className="btn w-full h-14 bg-[#ef4444] hover:bg-red-600 text-white border-none rounded-2xl text-xl font-bold shadow-lg capitalize tracking-wide mt-2"
          >
            Sign in
          </button>
        </form>

        <div className="divider before:bg-gray-300 after:bg-gray-300 my-8"></div>

        <div className="text-center">
          <p className="text-gray-700 text-lg">
            Don&apos;t have any account?{" "}
            <Link
              to={"/register"}
              className="text-[#ef4444] font-bold hover:underline"
            >
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
