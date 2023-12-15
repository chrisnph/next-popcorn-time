import { useEffect, useState } from "react";
import MovieTypes from "../typings";
import useAxios from "@/app/hooks/useAxios";

const useMovie = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<MovieTypes.movie[] | []>([]);
  const [query, setQuery] = useState<string>("");
  const [paging, setPaging] = useState<number>(1);

  const handleGetMovies = async (updateState?: boolean) => {
    try {
      updateState && setIsLoading(true);

      const {
        data: { page, results },
      }: {
        data: {
          page: number;
          results: MovieTypes.movie[];
        };
      } = await useAxios.get(
        `/3/movie/now_playing?language=en-US&sort_by=popularity.desc&include_adult=true&page=${paging}`
      );

      updateState && setMovies([...movies, ...results]);
      updateState && setIsLoading(false);

      return { page, results };
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    movies.length < 1 && handleGetMovies(true);
  }, [movies]);

  return {
    isLoading,
    setIsLoading,
    paging,
    setPaging,
    movies,
    setMovies,
    handleGetMovies,
    query,
    setQuery,
  };
};

export default useMovie;
