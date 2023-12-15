"use client";

import { ReactNode, createContext, useContext } from "react";
import useMovie from "./hooks/useMovie";
import MovieTypes from "./typings";

const MovieContext = createContext<MovieTypes.MovieContext>({
  isLoading: true,
  setIsLoading: () => {},
  movies: [],
  paging: 1,
  setPaging: () => {},
  setMovies: () => {},
  handleGetMovies: async () => [],
  query: "",
  setQuery: () => {},
});

const MovieProvider = ({ children }: { children: ReactNode }) => {
  const {
    isLoading,
    setIsLoading,
    movies,
    paging,
    setPaging,
    setMovies,
    handleGetMovies,
    query,
    setQuery,
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
