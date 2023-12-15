declare namespace MovieTypes {
  export interface movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }

  export interface MovieContext {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    movies: MovieTypes.movie[] | [];
    paging: number;
    setPaging: React.Dispatch<React.SetStateAction<number>>;
    setMovies: React.Dispatch<React.SetStateAction<movie[] | []>>;
    handleGetMovies: () => Promise<any>;
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
  }
}

export default MovieTypes;
