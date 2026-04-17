import UseAxiosSecure from "../../../Hook/UseAxiosSecure";

export const useSettingsApi = () => {
  const axiosSecure = UseAxiosSecure();

  return {
    getMe: async () => {
      const res = await axiosSecure.get("/users/me");
      return res.data;
    },
    updateMe: async (payload) => {
      const res = await axiosSecure.put("/users/me", payload);
      return res.data;
    },
    deleteMe: async () => {
      const res = await axiosSecure.delete("/users/me");
      return res.data;
    },
  };
};

