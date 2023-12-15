import { useCallback, useEffect, useState } from "react";
import MovieTypes from "../typings";
import useAxios from "@/app/hooks/useAxios";

const useMovie = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<MovieTypes.movie[] | []>([]);
  const [paging, setPaging] = useState<number>(1);
  const [filteredMovies, setFilteredMovies] = useState<MovieTypes.movie[] | []>(
    []
  );
  const [query, setQuery] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  const handleGetMovies = async (
    updateState?: boolean,
    customPage?: number
  ) => {
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

  const handleSearchMovie = useCallback(() => {
    const filteredData = movies.filter(({ title }) =>
      title.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredMovies(filteredData);
  }, [query]);

  const handleSortMovie = useCallback(() => {
    if (!sort) return;

    const sortOptions: string[] = sort.split("-");
    const sortType: string = sortOptions[0];
    const sortOrder: string = sortOptions[1];

    console.clear();

    const filteredData = movies.sort((a: any, b: any) => {
      let comparison;

      if (sortType === "title") {
        comparison = a.title.localeCompare(b.title);
      } else {
        comparison = a[sortType] - b[sortType];
      }

      if (comparison !== 0) {
        return sortOrder === "asc" ? comparison : -comparison;
      } else {
        return 0;
      }
    });

    setMovies(filteredData);
    setFilteredMovies([]);
  }, [sort]);

  useEffect(() => {
    handleSearchMovie();
  }, [query]);

  useEffect(() => {
    movies.length < 1 && handleGetMovies(true);
  }, [movies, paging]);

  useEffect(() => {
    handleSortMovie();
  }, [sort]);

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
  };
};

export default useMovie;
