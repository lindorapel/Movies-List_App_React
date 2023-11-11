import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import DetailMovies from "./pages/DetailMovies";
// import PopularMovies from "./pages/home/PopularMovies.";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/details/:movieId" element={<DetailMovies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
