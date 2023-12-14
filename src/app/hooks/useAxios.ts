import axios from "axios";

const useAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_URL,
});

useAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

useAxios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default useAxios;
