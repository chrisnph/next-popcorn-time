import { useEffect, useState } from "react";
import MovieTypes from "../typings";
import useAxios from "@/app/hooks/useAxios";

const useMovie = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<MovieTypes.movie[] | []>([]);
  const [query, setQuery] = useState<string>("");
  const [paging, setPaging] = useState<number>(1);

  const handleGetMovies = async (
    updateState?: boolean,
    customPage?: number
  ) => {
    try {
      updateState && setIsLoading(true);
      console.log({ paging });

      const {
        data: { page, results },
      }: {
        data: {
          page: number;
          results: MovieTypes.movie[];
        };
      } = await useAxios.get(
        `/3/movie/now_playing?language=en-US&sort_by=popularity.desc&include_adult=false&page=${
          customPage || paging
        }`
      );

      updateState && setMovies([...movies, ...results]);
      updateState && setIsLoading(false);

      return { page, results };
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleGetMoviesDetails = async ({
    movieId,
    updateState,
  }: {
    movieId: number;
    updateState?: boolean;
  }) => {
    try {
      updateState && setIsLoading(true);

      const { data }: { data: MovieTypes.movieDetails } = await useAxios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=videos,credits`
      );

      updateState && setIsLoading(false);

      return data;
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    movies.length < 1 && handleGetMovies(true);
  }, [movies, paging]);

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
    handleGetMoviesDetails,
  };
};

export default useMovie;
