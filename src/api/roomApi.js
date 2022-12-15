import axiosClient from "./axiosClient";

const roomApi = {
  getByTheater: async (idTheater) => {
    const url = `/room/get/by-theater/${idTheater}`;
    return await axiosClient.get(url);
  },
  add: async (id, data) => {
    const url = `/room/new/created-by/${id}`;
    return await axiosClient.post(url, data);
  },
  delete: async (id) => {
    const url = `/room/delete/${id}`;
    return await axiosClient.delete(url);
  },
};

export default roomApi;
