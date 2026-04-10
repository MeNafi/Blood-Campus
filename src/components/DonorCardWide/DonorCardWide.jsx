import React from "react";
import { FaPhoneAlt } from "react-icons/fa";

export const DonorCardWide = ({ donor, isUnavailable = false, remainingDays = 0, onToggleUnavailable }) => {
  const {
    name,
    fullName,
    bloodGroup = "N/A",
    email = "No email",
    phone = "No phone",
    city = "",
    area = "",
    subArea = "",
    lastDonationDate = "Unknown",
    profilePhoto,
    profileImage,
  } = donor || {};
  const donorName = fullName || name || "Anonymous Donor";
  const donorPhoto = profileImage || profilePhoto || "https://i.pravatar.cc/120?img=12";

  return (
    <article className="slide-up-fade rounded-xl border border-primary/30 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={donorPhoto}
            alt={donorName}
            className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/20"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{donorName}</h3>
            <p className="text-sm text-primary">{bloodGroup}</p>
            <p className="text-xs text-gray-500">{[subArea, area, city].filter(Boolean).join(", ")}</p>
          </div>
        </div>
        <div className="space-y-1 text-sm text-gray-600 sm:text-right">
          <p>{email}</p>
          <p>{phone}</p>
          <p>Last donation: {lastDonationDate}</p>
          {isUnavailable && <p className="text-xs font-semibold text-amber-600">Available in {remainingDays} day(s)</p>}
          <div className="mt-2 flex flex-wrap justify-end gap-2">
            <button className="btn btn-sm rounded-lg border-none bg-primary text-white hover:bg-red-600">
              <FaPhoneAlt size={12} />
              Call
            </button>
            <button
              onClick={() => onToggleUnavailable?.(donor)}
              className={`btn btn-sm rounded-lg border-none ${isUnavailable ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-gray-800 text-white hover:bg-gray-900"}`}
            >
              {isUnavailable ? "Mark Available" : "Donate Blood Done"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default DonorCardWide;