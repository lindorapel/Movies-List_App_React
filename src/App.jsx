import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import DetailMovies from "./pages/DetailMovies";
import Home from "./pages/home/Home";
import PopularMovies from "./pages/Popular";
import TopRatedMovies from "./pages/TopRated";
import NowPlaying from "./pages/NowPlaying";
import UpComing from "./pages/UpComing";
import SearchResult from "./pages/SearchResult";
import Similar from "./pages/Similar";
import Recomendation from "./pages/Recomendation";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/search" element={<SearchResult />} />
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieId" element={<DetailMovies />} />
        <Route path="/movie/popular" element={<PopularMovies />} />
        <Route path="/movie/top-rated" element={<TopRatedMovies />} />
        <Route path="/movie/now-playing" element={<NowPlaying />} />
        <Route path="/movie/upcoming" element={<UpComing />} />
        <Route path="/movie/similar/:movieId" element={<Similar />} />
        <Route
          path="/movie/recommendations/:movieId"
          element={<Recomendation />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
