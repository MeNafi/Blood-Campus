import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import bgImg from "../../../assets/main_big_pic.png";
import UseAuth from "../../../Hook/UseAuth";
import Swal from "sweetalert2";
import { ADMIN_EMAILS, DEMO_ADMIN_CREDENTIALS } from "../../../config/adminConfig";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const AdminLogin = () => {
  const { loginWithEmail, registerWithEmail } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (data) => {
    try {
      const result = await loginWithEmail(data.email, data.password);
      const email = result?.user?.email || "";
      if (!ADMIN_EMAILS.includes(email)) {
        throw new Error("This account is not approved as admin.");
      }
      navigate(location?.state || "/admin/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Admin login failed",
        text: error?.message || "Invalid credentials",
        confirmButtonColor: "#FF2C2C",
      });
    }
  };

  const handleCreateDemoAdmin = async () => {
    try {
      await registerWithEmail(DEMO_ADMIN_CREDENTIALS.email, DEMO_ADMIN_CREDENTIALS.password);
      Swal.fire({
        icon: "success",
        title: "Demo admin created in Firebase",
        text: "Now login with the demo credentials shown below.",
        confirmButtonColor: "#FF2C2C",
      });
    } catch (error) {
      Swal.fire({
        icon: "info",
        title: "Admin account exists",
        text: error?.message || "You can login with the existing admin account.",
        confirmButtonColor: "#FF2C2C",
      });
    }
  };

  return (
    <section
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center px-4 py-10"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="absolute inset-0 bg-white/60" />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white bg-rose-50/90 p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-primary">Admin Login</h1>
        <p className="mt-2 text-sm text-gray-600">Restricted to authorized BloodCampus administrators.</p>
        <p className="mt-2 rounded-lg bg-red-50 p-2 text-xs text-red-700">
          Demo admin: {DEMO_ADMIN_CREDENTIALS.email} / {DEMO_ADMIN_CREDENTIALS.password}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Admin Email</label>
            <input
              type="email"
              className="input input-bordered w-full rounded-xl"
              placeholder="admin@bloodcampus.com"
              {...register("email", { required: "Admin email is required" })}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full rounded-xl pr-12"
                placeholder="Enter password"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>

          <button type="submit" className="btn w-full rounded-xl border-none bg-primary text-white hover:bg-red-600">
            Sign In as Admin
          </button>
        </form>
        <button onClick={handleCreateDemoAdmin} className="btn mt-3 w-full rounded-xl border border-primary bg-white text-primary hover:bg-red-50">
          Create Demo Admin in Firebase
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
          Student login?{" "}
          <Link to="/login" className="font-semibold text-primary">
            Go to Student Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AdminLogin;
