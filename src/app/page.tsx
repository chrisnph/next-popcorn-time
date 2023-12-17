import BackToTop from "./components/BackToTop";
import { MovieProvider } from "./components/Movies/contexts/MovieContext/MovieProvider";
import Movies from "./components/Movies";

const Home = () => {
  return (
    <main className="bg-black">
      <MovieProvider>
        <Movies />
      </MovieProvider>
      <BackToTop />
    </main>
  );
};

export default Home;
