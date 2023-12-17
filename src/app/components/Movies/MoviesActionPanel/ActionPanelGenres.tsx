import { useMovieContext } from "@/app/components/Movies/contexts/MovieContext/MovieProvider";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useAnimationControls } from "framer-motion";
import { genreSelectionAnimation } from "../animations";

const ActionPanelGenres = () => {
  const { genres, setQuery, selectedGenres, setSelectedGenres } =
    useMovieContext();
  const animateControls = useAnimationControls();

  const handleShowGenres = async (
    currentTarget: EventTarget & HTMLButtonElement
  ) => {
    const isGenreSelectionVisible =
      document.getElementById("genre-selection")?.style.opacity === "1";

    currentTarget.disabled = true;

    await animateControls.start(
      !isGenreSelectionVisible ? "visible" : "hidden"
    );

    currentTarget.disabled = false;
  };

  return (
    <div className="text-black text-[1.2rem] font-medium p-0 m-0 w-full rounded-3xl mb-[100px] h-[40px]">
      <input
        type="text"
        placeholder="Search for a movie"
        className="rounded-3xl outline-none w-full px-6 py-3 bg-white bg-opacity-80 h-[40px]"
        onChange={({ currentTarget: { value } }) => setQuery(value)}
      />

      <div className="relative flex items-start text-[#B6FFF5] mt-3 mx-4 leading-none">
        <button
          className="text-[14px] font-extrabold mr-10 flex items-center leading-none"
          onClick={({ currentTarget }) => handleShowGenres(currentTarget)}
        >
          <div className="flex mt-1">
            <FontAwesomeIcon icon={faSearch} className="mr-1" />
            <span>Genres</span>
          </div>
        </button>

        <motion.div
          {...genreSelectionAnimation}
          initial="initial"
          animate={animateControls}
          id="genre-selection"
          className="text-white -z-10 opacity-0 top-0 left-0 text-[14px] font-extrabold absolute w-full bg-gray-950 bg-opacity-80 p-[30px] rounded-md shadow-inner ring-[2px] ring-[#B6FFF5] ring-opacity-70"
        >
          <fieldset className="w-auto flex flex-wrap items-center">
            {genres.map((genre) => (
              <div
                key={genre.id}
                className="flex items-center gap-1 cursor-pointer mt-3 mr-5 z-10"
                onClick={({ currentTarget }) => {
                  const checkboxElement = currentTarget.querySelector("input");

                  if (!checkboxElement) return;

                  checkboxElement.checked = !checkboxElement.checked;

                  const genreCheckBoxes =
                    document.querySelectorAll(".checkbox-genre");

                  if (!genreCheckBoxes) return;

                  let genresSelected: any = [];

                  genreCheckBoxes.forEach((genreCheckBox: any) => {
                    if (!genreCheckBox.checked) {
                      genresSelected = genresSelected.filter(
                        (e: string) => e !== genreCheckBox.value
                      );
                    } else {
                      const genre = genres.find(
                        (_genre) => _genre.id === Number(genreCheckBox.value)
                      );

                      genresSelected.push(genre);
                    }
                  });

                  setSelectedGenres(genresSelected);
                }}
              >
                <input
                  type="checkbox"
                  value={genre.id}
                  className="checkbox-genre -z-10"
                />
                <label className="pb-[1px]">{genre.name}</label>
              </div>
            ))}
          </fieldset>
        </motion.div>

        <div className="text-[12px] font-extralight  hidden sm:flex flex-wrap">
          {selectedGenres.length > 0 &&
            selectedGenres.map(({ id, name }) => (
              <span
                key={id}
                className="ml-5 w-auto justify-center items-center flex leading-6"
              >
                {name}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ActionPanelGenres;
