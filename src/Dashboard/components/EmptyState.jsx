import React from "react";
import { Inbox } from "lucide-react";

const EmptyState = ({
  title = "Nothing here yet",
  description = "Try adjusting filters or come back later.",
  action,
  icon: Icon = Inbox,
}) => {
  return (
    <div className="rounded-2xl border-2 border-dashed bg-white px-6 py-14 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon size={22} />
      </div>
      <h3 className="mt-4 text-lg font-bold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
};

export default EmptyState;

