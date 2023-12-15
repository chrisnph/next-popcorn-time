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

  export interface movieDetails {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: null;
    budget: number;
    genres: {
      id: number;
      name: string;
    }[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }[];
    production_countries: {
      iso_3166_1: string;
      name: string;
    }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
    }[];
    status: string;
    tagline: string;
    title: string;
    video: false;
    vote_average: number;
    vote_count: number;
    videos: {
      results: {
        iso_639_1: string;
        iso_3166_1: string;
        name: string;
        key: string;
        site: string;
        size: number;
        type: string;
        official: boolean;
        published_at: string;
        id: string;
      }[];
    };
    credits: {
      cast: {
        adult: boolean;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string;
        cast_id: number;
        character: string;
        credit_id: string;
        order: number;
      }[];
      crew: {
        adult: boolean;
        gender: number;
        id: number;
        popularity: number;
        known_for_department: string;
        name: string;
        original_name: string;
        profile_path: string;
        credit_id: string;
        department: string;
        job: string;
      }[];
    };
  }

  export interface MovieContext {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    movies: MovieTypes.movie[] | [];
    setMovies: React.Dispatch<React.SetStateAction<movie[] | []>>;
    paging: number;
    setPaging: React.Dispatch<React.SetStateAction<number>>;
    handleGetMovies: (
      updateState?: boolean,
      customPage?: number
    ) => Promise<any>;
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    filteredMovies: MovieTypes.movie[] | [];
    setFilteredMovies: React.Dispatch<React.SetStateAction<movie[] | []>>;
    sort: string;
    setSort: React.Dispatch<React.SetStateAction<string>>;
  }
}

export default MovieTypes;
