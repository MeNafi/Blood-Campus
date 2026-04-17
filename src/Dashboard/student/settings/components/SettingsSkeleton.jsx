import React from "react";

const Block = ({ className }) => <div className={["animate-pulse rounded-2xl bg-gray-100", className].join(" ")} />;

const SettingsSkeleton = () => {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="space-y-4">
        <Block className="h-6 w-56" />
        <Block className="h-4 w-80" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Block className="h-12 w-full" />
          <Block className="h-12 w-full" />
          <Block className="h-12 w-full" />
          <Block className="h-12 w-full" />
        </div>
        <Block className="h-28 w-full" />
      </div>
    </div>
  );
};

export default SettingsSkeleton;

