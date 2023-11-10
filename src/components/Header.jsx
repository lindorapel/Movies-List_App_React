import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";
// import axios from "axios";
import { BiSearch } from "react-icons/bi";
import { BsArrowLeftShort } from "react-icons/bs";

const Header = () => {
  const [searchParams] = useSearchParams();

  const [navBg, setNavBg] = useState(false);
  const [responsive, setResponsive] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const query = searchParams.get("query");

  // change navbg
  const changeNavBg = () => {
    window.scrollY >= 1 ? setNavBg(true) : setNavBg(false);
  };

  // set when window size
  const handleWindowResize = () => {
    setResponsive(window.innerWidth <= 768);
    if (window.innerWidth > 768) {
      setOpenSearch(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavBg);
    window.addEventListener("resize", handleWindowResize); // Listen for window resize
    handleWindowResize(); // Call it initially to set the initial value
    return () => {
      window.removeEventListener("scroll", changeNavBg);
      window.removeEventListener("resize", handleWindowResize); // Clean up event listener
    };
  }, []);

  return (
    <>
      {/* Desktop Screen */}
      {responsive === false && (
        <div
          className={`nav-wrapper w-full fixed z-[10000] ${
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
              <SearchBar defaultKeyword={query} className="hidden md:inline " />
            </div>
            <div className="flex flex-row gap-3">
              <button
                className="md:hidden text-white"
                onClick={() => {
                  setResponsive(true);
                }}
              >
                <BiSearch className=" text-gray-300" size={26} />
              </button>
              <button className="border-2 border-solid border-red-700 rounded-md text-red-700 hover:bg-red-700 hover:text-white font-bold py-1 px-3">
                Login
              </button>
              <button className="bg-red-700 hover:bg-red-800 py-1 px-3 rounded-md whitespace-nowrap font-medium">
                Sign Up
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Mobile Screen */}
      {responsive && (
        <>
          {/* button search not clickid */}
          {openSearch === false && (
            <div
              className={`nav-wrapper w-full fixed z-[10000] ${
                navBg ? "bg-current duration-500" : ""
              }`}
            >
              <nav
                className={`container colors flex justify-between top-0 text-white w-full mx-auto py-3`}
              >
                <div>
                  <Link to={"/"} className="text-2xl font-bold w-full">
                    movie
                    <span className="brightness-125 text-red-700">Coy</span>
                  </Link>
                </div>
                <div className="w-full max-w-xs md:max-w-sm lg:max-w-xl">
                  <SearchBar
                    defaultKeyword={query}
                    // className="hidden md:inline "
                    responsiveForm={"rounded-full hidden md:inline "}
                  />
                </div>
                <div className="flex flex-row gap-3">
                  <button
                    className="md:hidden text-white"
                    onClick={() => {
                      setOpenSearch(true);
                    }}
                  >
                    <BiSearch className=" text-gray-300 " size={26} />
                  </button>
                  <button className="border-2 border-solid border-red-700 rounded-md text-red-700 hover:bg-red-700 hover:text-white font-bold py-1 px-3">
                    Login
                  </button>
                  <button className="bg-red-700 hover:bg-red-800 py-1 px-3 rounded-md whitespace-nowrap font-medium">
                    Sign Up
                  </button>
                </div>
              </nav>
            </div>
          )}

          {/* button search are clickit */}
          {openSearch && (
            <div className=" fixed w-full z-[10000] bg-black ">
              <div className="container flex py-3 mx-auto gap-3">
                <BsArrowLeftShort
                  className=" text-gray-400"
                  size={36}
                  onClick={() => {
                    setOpenSearch(false);
                  }}
                />
                <div className="w-full">
                  <SearchBar defaultKeyword={query} />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Header;
