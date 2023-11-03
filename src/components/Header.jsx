import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import axios from "axios";

const Header = () => {
  const [searchParams] = useSearchParams();
  const [setSearchMovie] = useState([]);

  const query = searchParams.get("query");
  const page = searchParams.get("page");

  // change navbg
  const [navBg, setNavBg] = useState(false);

  const changeNavBg = () => {
    window.scrollY >= 1 ? setNavBg(true) : setNavBg(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavBg);
    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);

  //send title movie value to search bar
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
    <div
      className={`nav-wrapper w-full fixed z-50 ${
        navBg ? "bg-current duration-500" : ""
      }`}
    >
      <nav
        className={`container colors flex justify-between top-0 text-white w-full mx-auto py-3`}
      >
        <div>
          <Link to={"/"} className="text-2xl font-bold w-full">
            movie<span className="brightness-125 text-red-700">Coy</span>
          </Link>
        </div>
        <div className="w-full max-w-xs md:max-w-sm lg:max-w-xl">
          <SearchBar defaultKeyword={query} className="" />
        </div>
        <div className="flex flex-row gap-4">
          <button className="border-2 border-solid border-red-700 rounded-md text-red-700 hover:bg-red-700 hover:text-white font-bold py-1 px-3">
            Login
          </button>
          <button className="bg-red-700 hover:bg-red-800 py-1 px-3 rounded-md whitespace-nowrap font-medium">
            Sign Up
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
