"use client";

import Card from "../Tailwind/Card";
import { useMovieContext } from "./contexts/MovieContext/MovieProvider";
import { motion } from "framer-motion";
import { cardAnimation, delayedFadeInAnimation } from "./animations";
import { useEffect, useRef, useState } from "react";
import useModal from "../Tailwind/Modal/hooks/useModal";
import MovieDetailsModal from "./MovieDetails";
import ActionPanelGenres from "./MoviesActionPanel/ActionPanelGenres";

const Movies = () => {
  const {
    isLoading,
    movies,
    paging,
    filteredMovies,
    setPaging,
    sort,
    setSort,
    rating,
    selectedGenres,
  } = useMovieContext();

  const { showModal, setShowModal } = useModal();

  const movieRef = useRef(null);

  const [scrollAmount, setScrollAmount] = useState(0);
  const [movieId, setmovieId] = useState<number>();

  useEffect(() => {
    if (!movieRef.current) return;

    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting) {
        setPaging(paging + 1);
        setScrollAmount(window.scrollY);
        observer.unobserve(entry.target);
      }
    });

    observer.observe(movieRef.current);

    return () => {
      observer.disconnect();
    };
  }, [movies, filteredMovies, paging, setPaging, sort, rating, selectedGenres]);

  useEffect(() => {
    window.scrollTo(0, scrollAmount);
  }, [scrollAmount]);

  if (isLoading) return <></>;

  return (
    <>
      <MovieDetailsModal
        movieId={movieId}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <div className="mt-[50px] px-[1rem] md:px-[5rem]">
        <ActionPanelGenres />

        <motion.div className="my-[1rem]" {...delayedFadeInAnimation}>
          <div className="my-10 md:my-5 flex flex-col sm:flex-row justify-between items-start md:items-end">
            <span className="text-[#B6FFF5] text-[2rem] font-extrabold p-0 m-0 leading-none w-[250px]">
              In Theaters
            </span>

            <div className="flex flex-col md:flex-row md:gap-20">
              <div className="flex items-end text-[#B6FFF5] gap-2 font-medium">
                <span className="h-[31px] flex items-center">Sort By: </span>
                <select
                  name="sort"
                  id="sort"
                  className="outline-none bg-transparent flex items-center"
                  defaultValue="popularity-desc"
                  onChange={({ currentTarget: { value } }) => setSort(value)}
                >
                  <option value="title-asc">Title (Ascending)</option>
                  <option value="title-desc">Title (Descending)</option>
                  <option value="release-desc">Release (Newest)</option>
                  <option value="release-asc">Release (Oldest)</option>
                  <option value="popularity-asc">
                    Popularity (Lowest to Highest)
                  </option>
                  <option value="popularity-desc">
                    Popularity (Highest to Lowest)
                  </option>
                  <option value="vote_average-asc">
                    Rating (Lowest to Highest)
                  </option>
                  <option value="vote_average-desc">
                    Rating (Highest to Lowest)
                  </option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-10 sm:gap-4 w-full">
          {(filteredMovies.length > 0 ? filteredMovies : movies).map(
            (movie, index) => (
              <div
                key={index}
                ref={index === movies.length - 1 ? movieRef : null}
                data-ref={index === movies.length - 1 ? index : null}
                onClick={() => {
                  setmovieId(movie.id);
                  setShowModal(!showModal);
                }}
              >
                <motion.div className="mb-4 cursor-pointer" {...cardAnimation}>
                  <motion.div className="w-[350px] sm:w-[300px] md:w-[240px] h-[450px] sm:h-[400px] md:h-[340px]">
                    <Card
                      bgImg={
                        process.env.NEXT_PUBLIC_TMDB_IMAGE_URL +
                        movie.poster_path
                      }
                    />
                  </motion.div>

                  <div className="flex justify-between my-3 w-[350px] sm:w-[300px] md:w-[240px] gap-3">
                    <span className="text-[#B6FFF5] font-medium p-0 m-0">
                      {movie.title}
                    </span>
                    <span className="text-[#777777] font-thin p-0 m-0">
                      {new Date(movie.release_date).getFullYear()}
                    </span>
                  </div>
                </motion.div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Movies;
