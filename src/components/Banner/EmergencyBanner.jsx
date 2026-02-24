import React from 'react';

const EmergencyBanner = () => {
  return (
    <section className="bg-[#FFF4F4] py-10 px-4 sm:px-8 md:px-12 lg:px-20">
      <div className="max-w-300 mx-auto">
        {/* Main Red Card */}
        <div className="bg-[#FF2C2C] rounded-lg p-6 sm:p-10 md:p-14 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          
          {/* Text Content */}
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center sm:text-left leading-tight">
            Need Blood Urgently ?
          </h2>

          {/* Emergency Button Container */}
          {/* On mobile, it stays centered. On tablet/desktop, it uses the half-overlay look from the pic */}
          <div className="relative">
            <button className="bg-white text-black font-semibold py-3 px-6 sm:py-4 sm:px-10 rounded-l-md shadow-lg hover:bg-gray-100 transition-colors text-lg md:text-xl">
              Emergency
            </button>
            
            {/* White side decoration to match the image's "cut-out" effect on the right */}
            <div className="hidden sm:block absolute top-0 -right-10 md:-right-14 h-full w-10 md:w-14 bg-[#FFF4F4]"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EmergencyBanner;