import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import { searchMovies } from "../utils/data";
import { useSearchParams } from "react-router-dom";

function SearchPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [foundMovies, setFoundMovies] = useState([]);

  const title = searchParams.get("title");

  const onSearchHandler = (keyword) => {
    setFoundMovies(searchMovies(keyword));
    changeSearchParams(keyword);
  };

  function changeSearchParams(keyword) {
    setSearchParams({ title: keyword });
  }

  useEffect(() => {
    if (title) {
      setFoundMovies(searchMovies(title));
    }
  }, [title]);

  return (
    <>
      <h2>Search Movie</h2>
      <SearchBar search={onSearchHandler} defaultKeyword={title} />
      <MovieList movies={foundMovies} />;
    </>
  );
}

export default SearchPageWrapper;
