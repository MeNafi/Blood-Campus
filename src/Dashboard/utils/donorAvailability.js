const STORAGE_KEY = "bloodCampusUnavailableDonors";

export const getUnavailableDonorMap = () => {
  
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};


export const setUnavailableDonorMap = (map) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
};

export const addUnavailableDonor = (donorId) => {
  const map = getUnavailableDonorMap();
  const now = Date.now();
  const availableAt = now + 90 * 24 * 60 * 60 * 1000;
  map[donorId] = { markedAt: now, availableAt };
  setUnavailableDonorMap(map);
  return map;
};


export const removeUnavailableDonor = (donorId) => {
  const map = getUnavailableDonorMap();
  delete map[donorId];
  setUnavailableDonorMap(map);
  return map;
};

export const cleanupExpiredUnavailable = () => {
  const map = getUnavailableDonorMap();
  const now = Date.now();
  const cleaned = Object.fromEntries(
    Object.entries(map).filter(([, value]) => Number(value?.availableAt || 0) > now)
  );
  setUnavailableDonorMap(cleaned);
  return cleaned;
};

export const getRemainingDays = (availableAt) => {
  const ms = Number(availableAt || 0) - Date.now();
  return Math.max(0, Math.ceil(ms / (24 * 60 * 60 * 1000)));
};