import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hook/UseAxiosSecure";
import DonorCardWide from "../../components/DonorCardWide/DonorCardWide";
import { cleanupExpiredUnavailable, getRemainingDays, removeUnavailableDonor } from "../../utils/donorAvailability";

const UnableDonor = () => {
  const axiosSecure = UseAxiosSecure();
  const [unavailableMap, setUnavailableMap] = useState({});

  useEffect(() => {
    setUnavailableMap(cleanupExpiredUnavailable());
  }, []);

  const { data: response, isLoading } = useQuery({
    queryKey: ["allDonorsForUnable"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donor/find-donor");
      return res.data;
    },
  });

  const donorList = useMemo(() => response?.data?.donors ?? [], [response]);
  const unableDonors = useMemo(
    () => donorList.filter((donor) => unavailableMap[donor?._id]),
    [donorList, unavailableMap]
  );

  const handleToggleUnavailable = (donor) => {
    const donorId = donor?._id;
    if (!donorId) return;
    setUnavailableMap(removeUnavailableDonor(donorId));
  };

  return (
    <section className="min-h-screen bg-brand-bg py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
          <h1 className="text-3xl font-bold text-primary">Unable Donor</h1>
          <p className="text-sm text-gray-600">These donors are on 3-month cooldown after donation.</p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 w-full animate-pulse rounded-xl bg-white" />
            ))}
          </div>
        ) : unableDonors.length > 0 ? (
          <div className="space-y-4">
            {unableDonors.map((donor) => (
              <DonorCardWide
                key={donor._id}
                donor={donor}
                isUnavailable
                remainingDays={getRemainingDays(unavailableMap[donor._id]?.availableAt)}
                onToggleUnavailable={handleToggleUnavailable}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-white p-10 text-center text-gray-600">No unable donor right now.</div>
        )}
      </div>
    </section>
  );
};

export default UnableDonor;
