import { MovieProvider } from "./contexts/MovieContext/MovieProvider";
import Movies from "./Movies";

const Home = () => {
  return (
    <main className="bg-black">
      <MovieProvider>
        <Movies />
      </MovieProvider>
    </main>
  );
};

export default Home;
