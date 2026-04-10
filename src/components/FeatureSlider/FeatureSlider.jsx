import React from "react";

const slides = [
  {
    title: "University Verified Donors",
    text: "Only approved university emails can access donor actions for higher trust.",
  },
  {
    title: "Instant Emergency Response",
    text: "Request blood quickly and contact matching donors from your campus network.",
  },
  {
    title: "Secure & Private Contact",
    text: "Students can connect safely with protected contact visibility and alerts.",
  },
];

const FeatureSlider = () => {
  return (
    <section className="bg-brand-bg py-12">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <h2 className="mb-5 text-2xl font-bold text-gray-900">Why BloodCampus</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {slides.map((slide, i) => (
            <article
              key={slide.title}
              className="slide-up-fade rounded-xl border border-primary/20 bg-white p-6 shadow-sm"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <h3 className="text-lg font-semibold text-primary">{slide.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{slide.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSlider;
