import { useEffect, useState } from "react";
import MovieTypes from "../typings";
import useAxios from "@/app/hooks/useAxios";

const useMovie = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<MovieTypes.movie[] | []>([]);
  const [query, setQuery] = useState<string>("");

  const handleGetMovies = async (page: number = 1) => {
    try {
      setIsLoading(true);

      const { data } = await useAxios.get(
        `/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`
      );

      console.clear()
      console.log(data.results)
      setMovies(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    movies.length < 1 && handleGetMovies();
  }, [movies]);

  return {
    isLoading,
    setIsLoading,
    movies,
    setMovies,
    handleGetMovies,
    query,
    setQuery,
  };
};

export default useMovie;
