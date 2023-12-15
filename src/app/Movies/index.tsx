"use client";

import Card from "../components/Tailwind/Card";
import { useMovieContext } from "../contexts/MovieContext/MovieProvider";
import { motion } from "framer-motion";
import { cardAnimation, delayedFadeInAnimation } from "./animations";
import { useEffect, useRef, useState } from "react";

const Movies = () => {
  const { isLoading, movies, setMovies, handleGetMovies, paging, setPaging } =
    useMovieContext();

  const movieRef = useRef(null);

  const [scrollAmount, setScrollAmount] = useState(0);

  useEffect(() => {
    if (!movieRef.current) return;

    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting) {
        setPaging((prevPaging) => prevPaging + 1);
        const { results } = await handleGetMovies();

        setMovies([...movies, ...results]);
        setScrollAmount(window.scrollY);
        observer.unobserve(entry.target);
      }
    });

    observer.observe(movieRef.current);

    return () => {
      observer.disconnect();
    };
  }, [movies, paging, setPaging]);

  useEffect(() => {
    window.scrollTo(0, scrollAmount);
  }, [scrollAmount]);

  if (isLoading) return <></>;

  return (
    <div className="mt-[50px] px-[1rem] md:px-[5rem]">
      <motion.div className="my-[1rem]" {...delayedFadeInAnimation}>
        <div className="my-10 md:my-5">
          <span className="text-[#B6FFF5] text-[2rem] font-extrabold p-0 m-0">
            In Theaters
          </span>
        </div>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-10 sm:gap-4 w-full">
        {movies.map((movie, index) => (
          <div
            ref={index === movies.length - 1 ? movieRef : null}
            data-ref={index === movies.length - 1 ? index : null}
            key={index}
          >
            <motion.div className="mb-4 cursor-pointer" {...cardAnimation}>
              <motion.div className="w-[350px] sm:w-[300px] md:w-[240px] h-[450px] sm:h-[400px] md:h-[340px]">
                <Card
                  bgImg={
                    process.env.NEXT_PUBLIC_TMDB_IMAGE_URL + movie.poster_path
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
        ))}
      </div>
    </div>
  );
};

export default Movies;
