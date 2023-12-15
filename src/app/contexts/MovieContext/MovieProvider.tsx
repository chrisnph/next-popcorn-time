"use client";

import { ReactNode, createContext, useContext } from "react";
import useMovie from "./hooks/useMovie";
import MovieTypes from "./typings";

const MovieContext = createContext<MovieTypes.MovieContext>({
  isLoading: true,
  setIsLoading: () => {},
  movies: [],
  setMovies: () => {},
  paging: 1,
  setPaging: () => {},
  handleGetMovies: async () => [],
  query: "",
  setQuery: () => {},
  sort: "",
  setSort: () => {},
  filteredMovies: [],
  setFilteredMovies: () => {},
});

const MovieProvider = ({ children }: { children: ReactNode }) => {
  const {
    isLoading,
    setIsLoading,
    movies,
    setMovies,
    paging,
    setPaging,
    handleGetMovies,
    query,
    setQuery,
    filteredMovies,
    setFilteredMovies,
    sort,
    setSort,
  }: MovieTypes.MovieContext = useMovie();

  return (
    <MovieContext.Provider
      value={{
        isLoading,
        setIsLoading,
        movies,
        paging,
        setPaging,
        setMovies,
        handleGetMovies,
        query,
        setQuery,
        filteredMovies,
        setFilteredMovies,
        sort,
        setSort,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

const useMovieContext = () => {
  const context = useContext(MovieContext);

  if (!context)
    throw new Error("useMovieContext must be used within a MovieProvider");

  return context;
};

export { MovieProvider, MovieContext, useMovieContext };
