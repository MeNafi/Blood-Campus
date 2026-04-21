import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUserGraduate, FaWeightHanging, FaVenusMars } from "react-icons/fa";

const DonorCardWide = ({ donor, isUnavailable = false, remainingDays = 0 }) => {
  
  const {
    fullName,
    studentId,
    department,
    bloodGroup = "N/A",
    email = "No email",
    phone = "No phone",
    presentAddress = "Address not available",
    gender = "Not specified", // Added gender
    weight,
    avatar,
    _id
  } = donor || {};

  const donorName = fullName || "Anonymous Donor";

  return (
    <article className="slide-up-fade rounded-xl border border-primary/30 bg-white p-4 shadow-sm sm:p-5 transition-all hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        
        {/* Left Side: Avatar & Identity */}
        <div className="flex items-start gap-4">
          {avatar ? (
            <img
              src={avatar}
              alt={donorName}
              className="h-20 w-20 rounded-2xl object-cover ring-2 ring-primary/10 shadow-sm"
            />
          ) : (
            <div className="h-20 w-20 rounded-2xl bg-gray-50 flex items-center justify-center text-[10px] text-gray-400 border-2 border-dashed border-gray-200 uppercase font-bold text-center p-2">
              No Photo
            </div>
          )}

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-gray-900 tracking-tight">{donorName}</h3>
              <span className="rounded-md bg-red-50 px-2 py-0.5 text-[10px] font-black text-red-600 uppercase">
                {bloodGroup}
              </span>
            </div>
            
            <div className="flex flex-col gap-1">
              <p className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-tight">
                <FaUserGraduate className="text-gray-400" size={10} />
                {department || "General"} • {studentId || "ID Unknown"}
              </p>
              <p className="flex items-center gap-2 text-xs text-gray-500">
                <FaMapMarkerAlt className="text-gray-400" size={10} />
                {presentAddress}
              </p>
            </div>

            {/* Health Info: Weight Only */}
            <div className="mt-2">
              <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase">
                <FaWeightHanging size={10} />
                Weight: <span className="text-gray-700">{weight ? `${weight} KG` : "—"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact & Actions */}
        <div className="flex flex-col sm:items-end justify-between h-full space-y-3">
          <div className="space-y-1 text-sm sm:text-right">
            <p className="flex items-center sm:justify-end gap-2 font-medium text-gray-700">
              <FaEnvelope size={12} className="text-gray-400" />
              {email}
            </p>
            
            {/* Swapped Last Donation for Gender */}
            <p className="flex items-center sm:justify-end gap-2 text-[11px] font-black text-gray-400 uppercase tracking-tighter">
              <FaVenusMars size={10} className="text-gray-400" />
              Gender: <span className="text-gray-600">{gender}</span>
            </p>
            
            {isUnavailable && (
              <div className="mt-1 inline-block">
                <span className="rounded-full bg-amber-50 px-3 py-0.5 text-[10px] font-black text-amber-600 uppercase">
                  Available in {remainingDays} day(s)
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            <a 
              href={`tel:${phone}`} 
              className="btn btn-sm rounded-xl border-none bg-red-600 text-white hover:bg-red-700 flex items-center gap-2 px-5"
            >
              <FaPhoneAlt size={12} />
              Call Now
            </a>
          </div>
        </div>

      </div>
    </article>
  );
};

export default DonorCardWide;