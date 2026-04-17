import React from "react";
import { useOutletContext } from "react-router";
import FindDonor from "../../../Pages/FindDonor/FindDonor";

const FindBlood = () => {
  useOutletContext();
  return <FindDonor />;
};

export default FindBlood;

