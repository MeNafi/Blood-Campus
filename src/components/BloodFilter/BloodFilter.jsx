import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const BloodFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("A+");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section className="bg-brand-bg py-14">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-3xl font-bold text-primary">Blood Group Filter</h2>
            <div className="flex w-full overflow-hidden rounded-xl border border-primary/30 md:max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search blood group..."
                className="w-full bg-white px-4 py-2 text-sm outline-none"
              />
              <button className="bg-primary px-4 text-white" type="button">
                <FiSearch size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 md:grid-cols-4 lg:flex lg:flex-wrap">
            {bloodGroups.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`rounded-xl border px-6 py-2 text-lg font-semibold transition ${
                  selectedGroup === group
                    ? "border-primary bg-primary text-white"
                    : "border-primary/40 bg-white text-gray-700 hover:border-primary"
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BloodFilter;