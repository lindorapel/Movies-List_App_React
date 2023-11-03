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

    const searchQuery = keyword.trim();
    if (searchQuery === "") {
      // Jika input kosong, arahkan ke halaman beranda atau URL yang sesuai.
      navigate("/");
    } else {
      const searchUrl = `/search?query=${searchQuery}`;
      navigate(searchUrl);
    }
  };

  const onKeywordChangeHandler = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <form action="search w-full max-w-3xl px-4" onSubmit={onSubmitHandler}>
      <div className="relative">
        <svg
          // xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          name="search"
          className="text-white w-full max-w-3xl py-1.5 pr-12 pl-4 border-0 outline-none rounded-full bg-gray-900 bg-opacity-30  autofill:focus:bg-gray-900 autofill:focus:bg-opacity-10 focus:outline-none 
                                        focus:ring-2 
                                         focus:ring-red-700 focus:ring-opacity-90 
"
          type="text"
          placeholder="Search Movie ..."
          value={keyword}
          onChange={onKeywordChangeHandler}
        />
        {/* <button type="submit">Search</button> */}
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  defaultKeyword: PropTypes.string,
};

export default SearchBar;
