import MovieTypes from "./contexts/MovieContext/typings";

export const handleSearchMovieHelper = ({
  query,
  movies,
}: {
  query: string;
  movies: MovieTypes.movie[];
}) => {
  const filteredData = movies.filter(({ title }) =>
    title.toLowerCase().includes(query.toLowerCase())
  );

  return filteredData;
};

export const handleSortMovieHelper = ({
  sort,
  movies,
}: {
  sort: string;
  movies: MovieTypes.movie[];
}) => {
  if (!sort) return;

  let filteredData = [...movies];

  const sortOptions: string[] = sort.split("-");
  const sortType: string = sortOptions[0];
  const sortOrder: string = sortOptions[1];
  //   filteredData = filteredData.sort((a: any, b: any) => {
  //     let comparison;

  //     if (sortType === "title") {
  //       comparison = a.title.localeCompare(b.title);
  //     } else {
  //       comparison = a[sortType] - b[sortType];
  //     }

  //     if (comparison !== 0) {
  //       return sortOrder === "asc" ? comparison : -comparison;
  //     } else {
  //     //   return 0;
  //     }
  //   });

  filteredData = filteredData.sort((a: any, b: any) => {
    if (sortType === "title") {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortType === "release") {
      const dateA = new Date(a.release_date).getTime();
      const dateB = new Date(b.release_date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === "asc"
        ? a[sortType] - b[sortType]
        : b[sortType] - a[sortType];
    }
  });

  return filteredData;
};

export const handleFilterGenresHelper = ({
  selectedGenres,
  movies,
}: {
  selectedGenres: MovieTypes.movieGenres[] | [];
  movies: MovieTypes.movie[];
}) => {
  const filteredData = movies.filter((movie) =>
    movie.genre_ids.some((genre_id) =>
      selectedGenres.some(({ id }) => id === genre_id)
    )
  );

  return filteredData;
};
