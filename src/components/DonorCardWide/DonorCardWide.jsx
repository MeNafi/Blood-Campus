import React from "react";
import { FaPhoneAlt } from "react-icons/fa";

const DonorCardWide = ({ donor, isUnavailable = false, remainingDays = 0, onToggleUnavailable }) => {
  
  // Backend data structure onujayi destructuring
  const {
    fullName,
    bloodGroup = "N/A",
    email = "No email",
    phone = "No phone",
    presentAddress = "Address not available",
    lastDonationDate = "Unknown",
    avatar, // Backend e amra 'avatar' name save korchi
  } = donor || {};

  const donorName = fullName || "Anonymous Donor";

  return (
    <article className="slide-up-fade rounded-xl border border-primary/30 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          
          {/* Conditional Rendering: Chobi thakle dekhabe, na thakle blank/empty thakbe */}
          {avatar ? (
            <img
              src={avatar}
              alt={donorName}
              className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/20"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 border border-dashed border-gray-300">
              No Photo
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-gray-900">{donorName}</h3>
            <p className="text-sm font-bold text-red-600">{bloodGroup}</p>
            <p className="text-xs text-gray-500">{presentAddress}</p>
          </div>
        </div>

        <div className="space-y-1 text-sm text-gray-600 sm:text-right">
          <p className="font-medium text-gray-700">{email}</p>
          <p className="text-emerald-600 font-bold">{phone}</p>
          <p className="text-[11px] text-gray-400 uppercase tracking-tighter">
            Last donation: {lastDonationDate ? new Date(lastDonationDate).toLocaleDateString() : "Never"}
          </p>
          
          {isUnavailable && (
            <p className="text-xs font-semibold text-amber-600">Available in {remainingDays} day(s)</p>
          )}

          <div className="mt-2 flex flex-wrap justify-end gap-2">
            {/* Call Button */}
            <a 
              href={`tel:${phone}`} 
              className="btn btn-sm rounded-lg border-none bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"
            >
              <FaPhoneAlt size={12} />
              Call Now
            </a>

            {/* Toggle Status Button */}
            <button
              onClick={() => onToggleUnavailable?.(donor)}
              className={`btn btn-sm rounded-lg border-none ${
                isUnavailable 
                ? "bg-emerald-500 text-white hover:bg-emerald-600" 
                : "bg-gray-800 text-white hover:bg-gray-900"
              }`}
            >
              {isUnavailable ? "Mark Available" : "Donation Done"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default DonorCardWide;