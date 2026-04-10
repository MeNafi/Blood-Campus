import React from "react";
import { useNavigate } from "react-router";
import UseAuth from "../../Hook/UseAuth";
import Swal from "sweetalert2";

export const HomeCard = () => {
  const navigate = useNavigate();
  const { user } = UseAuth();

  const handleEmergency = () => {
    if (user) {
      navigate("/find-donor");
      return;
    }
    Swal.fire({
      title: "Sign in to continue",
      text: "Emergency donor contact needs account verification.",
      icon: "info",
      showDenyButton: true,
      confirmButtonText: "Sign In",
      denyButtonText: "Sign Up",
      confirmButtonColor: "#FF2C2C",
      denyButtonColor: "#111827",
    }).then((result) => {
      if (result.isConfirmed) navigate("/login");
      if (result.isDenied) navigate("/register");
    });
  };

  return (
    <section className="bg-brand-bg pb-14">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-xl bg-primary p-8 text-white shadow-md md:flex-row md:items-center md:p-12">
          <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">
            Need Blood Urgently ?
          </h2>
          <button
            onClick={handleEmergency}
            className="btn rounded-lg border-none bg-white px-8 text-gray-900 hover:bg-gray-100"
          >
            Emergency
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeCard;