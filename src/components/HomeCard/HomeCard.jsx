import React from 'react';

const HomeCard = ({ donor }) => {
    // Destructuring donor data with fallbacks for your demo
    const { 
        fullName = "Nafi Sarker", 
        bloodGroup = "A+", 
        studentId = "0242310005341222", 
        department = "SWE", 
        phone = "01612377346", 
        profileImage 
    } = donor || {};

    return (
        <div className="w-full max-w-[280px] bg-[#FFF5F5] border-2 border-[#E53935] rounded-[2rem] p-6 shadow-sm transition-transform hover:scale-[1.02] duration-300">
            {/* Header Section: Image and Name */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full border-2 border-[#E53935] overflow-hidden flex-shrink-0 bg-white">
                    {profileImage ? (
                        <img 
                            src={profileImage} 
                            alt={fullName} 
                            className="w-full h-full object-cover" 
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#E53935] font-bold text-2xl">
                            {fullName.charAt(0)}
                        </div>
                    )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight">
                    {fullName}
                </h3>
            </div>

            {/* Info Section */}
            <div className="space-y-2 text-gray-700 text-sm mb-8 font-medium">
                <p><span className="font-semibold">Blood Group :</span> {bloodGroup}</p>
                <p><span className="font-semibold">ID :</span> {studentId}</p>
                <p><span className="font-semibold">Department :</span> {department}</p>
                <p><span className="font-semibold">Phone :</span> {phone}</p>
            </div>

            {/* Action Button */}
            <a 
                href={`tel:${phone}`}
                className="block w-full bg-[#E53935] text-white text-center py-3 rounded-2xl font-bold text-lg hover:bg-[#C62828] transition-colors shadow-md active:scale-95"
            >
                Call
            </a>
        </div>
    );
};

export default HomeCard;