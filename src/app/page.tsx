import { MovieProvider } from "./contexts/MovieContext/MovieProvider";
import Movie from "./movie/page";

const Home = () => {
  return (
    <main className="bg-black">
      <MovieProvider>
        <Movie />
      </MovieProvider>
    </main>
  );
};

export default Home;
