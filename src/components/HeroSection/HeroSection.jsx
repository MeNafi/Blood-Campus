import React from "react";
import { useNavigate, Link } from "react-router";
import bgImage from "../../assets/main_big_pic.png";
import UseAuth from "../../Hook/UseAuth";
import Swal from "sweetalert2";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = UseAuth();

  const requireLoginForDonor = () => {
    if (user) {
      navigate("/find-donor");
      return;
    }
    Swal.fire({
      title: "Login required",
      text: "Please sign in or sign up to find blood donors.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sign In",
      cancelButtonText: "Sign Up",
      confirmButtonColor: "#FF2C2C",
      cancelButtonColor: "#9CA3AF",
    }).then((result) => {
      if (result.isConfirmed) navigate("/login");
      else navigate("/register");
    });
  };

  return (
    <section
      className="relative min-h-[70vh] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-white/65" />
      <div className="relative mx-auto flex min-h-[70vh] w-full max-w-[1200px] items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full lg:max-w-2xl text-center md:text-center lg:text-left">
          <h1 className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Find <span className="text-primary">Blood</span> Donors Instantly
            <br />
            On Your <span className="text-primary">Campus</span>
          </h1>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Trusted university donor network for emergency requests and fast student-to-student support.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row md:justify-center lg:justify-start">
            <button
              onClick={requireLoginForDonor}
              className="btn rounded-xl border-none bg-primary px-8 text-white hover:bg-red-600"
            >
              Find Blood Now
            </button>
            <Link
              to="/donor-register"
              className="btn rounded-xl border border-primary bg-transparent px-8 text-primary hover:bg-primary hover:text-white"
            >
              Register as Donor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;