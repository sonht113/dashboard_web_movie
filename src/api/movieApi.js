import axiosClient from "./axiosClient";

const movieApi = {
  addMovie: async (data) => {
    const url = "/movie/new";
    return await axiosClient.post(url, data);
  },
  getAll: async () => {
    const url = "/movie/list";
    return await axiosClient.get(url);
  },
  getAllQuery: async (search, status, page, limit) => {
    const url = "/movie/list";
    if (search && !status) {
      return await axiosClient.get(url, {
        params: {
          search: search,
          pageNumber: page,
          pageSize: limit,
        },
      });
    }
    if (status && !search) {
      return await axiosClient.get(url, {
        params: {
          status: status,
          pageNumber: page,
          pageSize: limit,
        },
      });
    }

    if (status && search) {
      return await axiosClient.get(url, {
        params: {
          search: search,
          status: status,
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
  updateMovie: async (id, data) => {},
};

export default movieApi;
