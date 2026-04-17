import React from "react";

const StickySaveBar = ({ show, saving, onSave, onReset }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 px-4 sm:px-6">
      <div className="mx-auto flex w-full max-w-[980px] items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-xl">
        <div>
          <p className="text-sm font-bold text-gray-900">Unsaved changes</p>
          <p className="text-xs text-gray-600">Save to apply updates across your account.</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onReset} className="btn rounded-2xl border border-gray-200 bg-white hover:bg-gray-50" disabled={saving}>
            Reset
          </button>
          <button type="button" onClick={onSave} className="btn rounded-2xl border-none bg-primary text-white hover:bg-red-600" disabled={saving}>
            {saving ? <span className="loading loading-spinner loading-sm" /> : null}
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickySaveBar;

