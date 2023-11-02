import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import axios from "axios";

const Header = () => {
  const [searchParams] = useSearchParams();
  const [setSearchMovie] = useState([]);

  const query = searchParams.get("query");
  const page = searchParams.get("page");

  useEffect(() => {
    const getSearchMovie = async () => {
      try {
        //get token from local storage
        const token = localStorage.getItem("token");
        if (!token) return;

        // Get the data from API with query and page variable
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/v1/search/movie?page=${page}&query=${query}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Set state for the movie that have been searched
        const { data } = response.data;
        console.log(data.name);
        setSearchMovie(data);
      } catch (error) {
        console.error(error);
      }
    };
    getSearchMovie();
  }, [query, page]);

  return (
    <div className="container flex justify-between text-white mx-auto">
      <div>
        <Link to={"/"}>MovieCoy</Link>
      </div>
      <div>
        <SearchBar defaultKeyword={query} />
      </div>
      <div>
        <button>Login</button>
        <button>Sign Up</button>
      </div>
    </div>
  );
};

export default Header;
