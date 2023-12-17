import { useCallback, useEffect, useState } from "react";
import MovieTypes from "../contexts/MovieContext/typings";
import useAxios from "@/app/hooks/useAxios";
import {
  handleFilterGenresHelper,
  handleSearchMovieHelper,
  handleSortMovieHelper,
} from "../helper";

const useMovie = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<MovieTypes.movie[] | []>([]);
  const [paging, setPaging] = useState<number>(1);
  const [filteredMovies, setFilteredMovies] = useState<MovieTypes.movie[] | []>(
    []
  );
  const [query, setQuery] = useState<string>("");
  const [sort, setSort] = useState<string>("popularity-desc");
  const [rating, setRating] = useState<number>(0);
  const [genres, setGenres] = useState<MovieTypes.movieGenres[] | []>([]);
  const [selectedGenres, setSelectedGenres] = useState<
    MovieTypes.movieGenres[] | []
  >([]);

  const handleFetchGenres = useCallback(async () => {
    try {
      const {
        data: { genres },
      }: {
        data: {
          genres: MovieTypes.movieGenres[];
        };
      } = await useAxios.get("/3/genre/movie/list?language=en");

      setGenres(genres);
    } catch (error) {
      console.error(error);
    }
  }, [genres, setGenres]);

  const handleGetMovies = useCallback(
    async (customPage?: number) => {
      try {
        const {
          data: { page, results },
        }: {
          data: {
            page: number;
            results: MovieTypes.movie[];
          };
        } = await useAxios.get(
          `/3/movie/now_playing?language=en-US&page=${customPage || paging}`
        );

        let filteredData: MovieTypes.movie[] = [];

        // filteredData = handleSearchMovieHelper({ query, movies: results });
        filteredData = handleSortMovieHelper({ sort, movies: results }) ?? [];

        if (selectedGenres.length > 0) {
          filteredData = handleFilterGenresHelper({
            selectedGenres,
            movies: results,
          });
        }

        const finalMoviesData = [
          ...new Set([...movies, ...(filteredData ?? [])]),
        ];

        setMovies(finalMoviesData);
      } catch (error: any) {
        console.error(error);
      }
    },
    [movies, setMovies, paging, query, sort]
  );

  const handleGetMoviesDetails = useCallback(
    async ({ movieId }: { movieId: number }) => {
      try {
        setIsLoading(true);

        const { data }: { data: MovieTypes.movieDetails } = await useAxios.get(
          `${process.env.NEXT_PUBLIC_TMDB_URL}/3/movie/${movieId}?language=en-US&append_to_response=videos,credits`
        );

        setIsLoading(false);

        return data;
      } catch (error: any) {
        console.error(error);
      }
    },
    [isLoading, setIsLoading]
  );

  const handleSearchMovie = useCallback(() => {
    const filteredData = handleSearchMovieHelper({ query, movies });
    setFilteredMovies(!query ? [] : filteredData);
  }, [query, movies, filteredMovies, setFilteredMovies]);

  const handleSortMovie = useCallback(() => {
    let filteredData = handleSortMovieHelper({ sort, movies });
    setFilteredMovies(filteredData ?? []);
  }, [sort, movies, handleSortMovieHelper, setFilteredMovies]);

  const handleFilterGenres = useCallback(() => {
    const movieData = handleFilterGenresHelper({ selectedGenres, movies });
    setFilteredMovies(movieData);
  }, [selectedGenres, filteredMovies, setFilteredMovies]);

  useEffect(() => {
    movies.length < 1 && handleGetMovies();
  }, [movies]);

  useEffect(() => {
    genres.length < 1 && handleFetchGenres();
  }, [genres]);

  useEffect(() => {
    handleSearchMovie();
  }, [query]);

  useEffect(() => {
    handleGetMovies();
  }, [paging]);

  useEffect(() => {
    handleSortMovie();
  }, [sort]);

  useEffect(() => {
    handleFilterGenres();
  }, [selectedGenres]);

  return {
    isLoading,
    setIsLoading,
    paging,
    setPaging,
    movies,
    filteredMovies,
    setFilteredMovies,
    setMovies,
    handleGetMovies,
    query,
    setQuery,
    handleGetMoviesDetails,
    sort,
    setSort,
    rating,
    setRating,
    genres,
    setGenres,
    selectedGenres,
    setSelectedGenres,
  };
};

export default useMovie;
