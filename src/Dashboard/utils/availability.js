const STORAGE_KEY = "bloodCampusStudentAvailability";
const HISTORY_KEY = "bloodCampusDonationHistory";

const safeJsonParse = (raw, fallback) => {
  try {
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

export const getAvailability = () => {
  const value = safeJsonParse(localStorage.getItem(STORAGE_KEY), null);
  return (
    value || {
      status: "able",
      reason: "",
      until: null,
      updatedAt: Date.now(),
    }
  );
};

export const setAvailability = (next) => {
  const value = {
    status: next?.status === "unable" ? "unable" : "able",
    reason: String(next?.reason || ""),
    until: next?.until ? Number(next.until) : null,
    updatedAt: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  return value;
};

export const setAbleNow = () =>
  setAvailability({
    status: "able",
    reason: "",
    until: null,
  });

export const setUnableUntil = ({ until, reason }) =>
  setAvailability({
    status: "unable",
    reason,
    until,
  });

export const getDonationHistory = () => {
  const list = safeJsonParse(localStorage.getItem(HISTORY_KEY), []);
  return Array.isArray(list) ? list : [];
};

export const addDonationEntry = ({ date, note }) => {
  const when = typeof date === "string" ? Date.parse(date) : Number(date);
  const entry = {
    id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
    date: Number.isFinite(when) ? when : Date.now(),
    note: String(note || ""),
    createdAt: Date.now(),
  };
  const next = [entry, ...getDonationHistory()].slice(0, 50);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  return next;
};

export const removeDonationEntry = (id) => {
  const next = getDonationHistory().filter((e) => e?.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  return next;
};

export const formatDate = (ms) => {
  const d = new Date(Number(ms));
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};

export const getNextAvailableLabel = (availability) => {
  const until = Number(availability?.until || 0);
  if (availability?.status !== "unable") return "Today";
  if (!until) return "Unknown";
  if (until <= Date.now()) return "Today";
  return formatDate(until);
};

