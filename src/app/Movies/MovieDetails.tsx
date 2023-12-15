import {
  Dispatch,
  IframeHTMLAttributes,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import Modal from "../components/Tailwind/Modal";
import MovieTypes from "../contexts/MovieContext/typings";
import useMovie from "../contexts/MovieContext/hooks/useMovie";

type CustomIframeProps = IframeHTMLAttributes<HTMLIFrameElement> & {
  id: string;
  type?: string;
};

const MovieDetailsModal = ({
  movieId,
  showModal,
  setShowModal,
}: {
  movieId?: number;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { handleGetMoviesDetails } = useMovie();

  const [movieDetails, setMovieDetails] = useState<MovieTypes.movieDetails>();
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState<string>("");

  const handleGetMovieDetails = useCallback(async () => {
    if (!movieId) return;

    const results: MovieTypes.movieDetails | undefined =
      await handleGetMoviesDetails({ movieId });

    setMovieDetails(results);
  }, [movieId, setMovieDetails, handleGetMoviesDetails]);

  useEffect(() => {
    if (showModal) {
      handleGetMovieDetails();
      document.querySelector("body")!.style.overflowY = "hidden";
    } else {
      document.querySelector("body")!.style.overflowY = "auto";
    }
  }, [showModal]);

  const iframeProps: CustomIframeProps = {
    id: "ytplayer",
    type: "text/html",
    src: youtubeVideoUrl,
    frameBorder: "0",
    allowFullScreen: true,
  };

  useEffect(() => {
    movieDetails?.videos &&
      setYoutubeVideoUrl(
        `https://www.youtube.com/embed/${
          movieDetails?.videos.results.find(({ site }) => site === "YouTube")
            ?.key
        }`
      );

    return () => {
      setYoutubeVideoUrl("");
    };
  }, [movieDetails]);

  if (!movieDetails) return <></>;

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className="flex flex-col justify-around rounded-t">
        <div className="md:flex justify-center items-center">
          {iframeProps.src && (
            <iframe
              {...iframeProps}
              className="h-[340px] md:h-[505px] w-full "
            />
          )}
        </div>

        <div className="text-[#B6FFF5] relative flex flex-col sm:flex-row gap-4">
          <div className="w-full md:max-w-[320px]">
            <img
              className="object-cover object-center min-h-[543px] sm:h-auto w-full hidden sm:block"
              src={
                process!.env!.NEXT_PUBLIC_TMDB_IMAGE_URL +
                movieDetails!.poster_path
              }
              alt="Movie Poster"
              onError={(e) => {
                e.currentTarget.src = "/placeholder-movie.png";
              }}
            />
          </div>
          <div className="flex justify-between items-start w-full py-[20px] pl-[10px] pr-[40px]">
            <div className="flex flex-col h-full max-h-none sm:max-h-[523px] overflow-y-hidden sm:overflow-y-auto">
              <div className="flex justify-between items-start w-full gap-5">
                <span className="text-[28px]">{movieDetails?.title}</span>
                <span className="text-[14px] md:text-[21px] text-[#777777]">
                  Rated {movieDetails?.vote_average.toFixed(1)} of 10
                </span>
              </div>

              <span className="text-[14px] text-[#acaaaa] font-extrabold">
                {movieDetails.genres.map(({ name }) => name).join(", ")}
              </span>

              <hr className="border border-b border-dotted border-[#353434] w-[100%] my-3" />

              <div className="flex flex-col">
                <span className="text-[16px] text-[#777777] mt-3">
                  {movieDetails.overview}
                </span>
              </div>

              <div className="flex items-start justify-start mt-10">
                <span className="text-[14px] text-[#acaaaa] font-extrabold">
                  Type:
                </span>
                <span className="text-[14px] text-[#777777] ml-2">Movie</span>
              </div>

              {movieDetails.production_countries[0] && (
                <div className="flex items-start justify-start">
                  <span className="text-[14px] text-[#acaaaa] font-extrabold">
                    Country:
                  </span>
                  <span className="text-[14px] text-[#777777] ml-2">
                    {movieDetails.production_countries[0].iso_3166_1}
                  </span>
                </div>
              )}

              <div className="flex items-start justify-start">
                <span className="text-[14px] text-[#acaaaa] font-extrabold">
                  Release Date:
                </span>
                <span className="text-[14px] text-[#777777] ml-2">
                  {new Date(movieDetails.release_date).toLocaleDateString(
                    undefined,
                    { day: "numeric", month: "long", year: "numeric" }
                  )}
                </span>
              </div>

              <div className="flex items-start justify-start">
                <span className="text-[14px] text-[#acaaaa] font-extrabold">
                  Run Time:
                </span>
                <span className="text-[14px] text-[#777777] ml-2">
                  {`${Math.floor(movieDetails.runtime / 60)} hours ${
                    movieDetails.runtime % 60
                  } minutes`}
                </span>
              </div>

              <div className="flex items-start justify-start">
                <span className="text-[14px] text-[#acaaaa] font-extrabold">
                  Status:
                </span>
                <span className="text-[14px] text-[#777777] ml-2">
                  {movieDetails.status}
                </span>
              </div>

              <div className="flex items-start justify-start">
                <span className="text-[14px] text-[#acaaaa] font-extrabold">
                  Cast:
                </span>
                <span className="text-[14px] text-[#777777] ml-2">
                  {movieDetails.credits.cast.map(({ name }) => name).join(", ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MovieDetailsModal;
