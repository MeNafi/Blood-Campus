import React from 'react';

const DonorCardWide = ({ donor }) => {
    // Destructuring with the data from your screenshot
    const { 
        fullName = "Ahsan Habib", 
        bloodGroup = "A+", 
        studentId = "0242310005341021", 
        department = "SWE", 
        phone = "01757276025", 
        profileImage 
    } = donor || {};

    return (
        <div className="w-full bg-[#FFF5F5] border border-[#E53935] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow duration-300">
            
            {/* Left Section: Image and Basic Info */}
            <div className="flex items-center gap-5 w-full md:w-auto">
                {/* Profile Image with Red Circular Border */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-[#E53935] overflow-hidden flex-shrink-0 bg-white">
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

                {/* Name, Blood Group, and Phone */}
                <div className="space-y-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                        {fullName}
                    </h3>
                    <p className="text-sm md:text-base font-medium text-gray-800">
                        Blood Group : <span className="font-bold">{bloodGroup}</span>
                    </p>
                    <p className="text-sm md:text-base font-medium text-gray-800">
                        Phone : {phone}
                    </p>
                </div>
            </div>

            {/* Right Section: ID, Dept, and Action */}
            <div className="flex flex-col items-end justify-between h-full w-full md:w-auto gap-4">
                <div className="text-right space-y-1">
                    <p className="text-sm md:text-base font-medium text-gray-800">
                        ID : {studentId}
                    </p>
                    <p className="text-sm md:text-base font-medium text-gray-800">
                        Department : {department}
                    </p>
                </div>

                {/* Action Button */}
                <a 
                    href={`tel:${phone}`}
                    className="w-32 md:w-40 bg-[#E53935] text-white text-center py-2 rounded-xl font-bold text-lg hover:bg-[#C62828] transition-colors shadow-sm active:scale-95"
                >
                    Call
                </a>
            </div>
        </div>
    );
};

export default DonorCardWide;