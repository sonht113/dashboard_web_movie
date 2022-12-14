import axiosClient from "./axiosClient";

const theaterApi = {
  addTheater: async (data) => {
    const url = "theater/new";
    return await axiosClient.post(url, data);
  },
  getAll: async () => {
    const url = "/theater/list";
    return await axiosClient.get(url);
  },
  getAllQuery: async (search, page, limit) => {
    const url = "/theater/list";
    if (search) {
      return await axiosClient.get(url, {
        params: {
          search: search,
          pageNumber: page,
          pageSize: limit,
        },
      });
    }

    return await axiosClient.get(url, {
      params: {
        pageNumber: page,
        pageSize: limit,
      },
    });
  },
};

export default theaterApi;
