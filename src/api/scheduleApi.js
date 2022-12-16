import axiosClient from "./axiosClient";

const scheduleApi = {
  add: async (theaterId, roomId, movieId, data) => {
    const url = `/schedule/new/created-by/${theaterId}/${roomId}/${movieId}`;
    return await axiosClient.post(url, data);
  },
  getQuery: async (page, limit) => {
    const url = "/schedule/list";
    const res = await axiosClient.get(url, {
      params: {
        pageNumner: page,
        pageSize: limit,
      },
    });
    return {
      totalPage: res.length,
      data: res,
    };
  },
  update: async (id, data) => {
    const url = `/schedule/update/${id}`;
    return await axiosClient.put(url, data);
  },
  getDetail: async (id) => {
    const url = `/schedule/get/${id}`;
    return axiosClient.get(url);
  },
};

export default scheduleApi;
