import React from "react";
import UseAuth from "../../../Hook/UseAuth";
import { useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const { loginWithGoogle, signOutUser } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      const email = result?.user?.email || "";
      const isUniversityEmail = email.endsWith("@diu.edu.bd");

      if (!isUniversityEmail) {
        await signOutUser();
        alert("Only approved university email is allowed.");
        return;
      }

      navigate(location?.state || "/");
    } catch (error) {
      alert(error?.message || "Google sign-in failed");
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="btn w-full rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
    >
      <FcGoogle size={20} />
      Continue with Google
    </button>
  );
};

export default SocialLogin;