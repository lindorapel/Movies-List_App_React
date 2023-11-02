import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function SearchBar({ defaultKeyword }) {
  const [keyword, setKeyword] = useState(defaultKeyword || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (defaultKeyword) {
      setKeyword(defaultKeyword);
    }
  }, [defaultKeyword]);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const searchQuery = event.target.search.value;
    if (searchQuery.trim() === "") {
      return;
    }
    const searchUrl = `/search?query=${searchQuery}`;
    // search(keyword);
    navigate(searchUrl);
  };

  const onKeywordChangeHandler = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <form action="search" onSubmit={onSubmitHandler}>
      <input
        name="search"
        className="text-black"
        type="text"
        placeholder="search movie by title"
        value={keyword}
        onChange={onKeywordChangeHandler}
      />
      <button type="submit">Search</button>
    </form>
  );
}

SearchBar.propTypes = {
  defaultKeyword: PropTypes.string,
};

export default SearchBar;
