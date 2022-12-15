import axiosClient from "./axiosClient";

const scheduleApi = {
  add: async (theaterId, roomId, movieId, data) => {
    const url = `/schedule/new/created-by/${theaterId}/${roomId}/${movieId}`;
    return await axiosClient.post(url, data);
  },
};

export default scheduleApi;
