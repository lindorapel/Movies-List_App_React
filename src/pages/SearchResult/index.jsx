import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieItem from "../../components/MovieItem";

function SearchResult() {
  const [searchParams] = useSearchParams();
  const [searchMovie, setSearchMovie] = useState([]);

  const query = searchParams.get("query");
  // const page = searchParams.get("page");

  useEffect(() => {
    const getSearchMovie = async () => {
      try {
        // Get the data from API with query and page variable
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/search/movie?query=${query}&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        // Set state for the movie that have been searched
        const { data } = response;
        setSearchMovie(data?.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getSearchMovie();
  }, [query]);

  console.log(searchMovie);

  return (
    <>
      <div className="container bg-black mx-auto ">
        <div className="featured mb-5 pt-24">
          <p className="text-2xl font-semibold border-solid border-l-4 border-red-600 text-white pl-2.5 mb-2.5">
            {`Search Movies = ${query}`}
          </p>
        </div>
        <div className="grid justify-center items-center auto-rows-auto auto-cols-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mx-auto">
          {searchMovie.map((search) => (
            <div key={search?.id}>
              <MovieItem
                id={search?.id}
                imageURL={
                  import.meta.env.VITE_API_IMAGE_URL + search?.poster_path
                }
                overview={search?.overview}
                title={search?.title}
                rating={search?.vote_average}
                release={search?.release_date}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchResult;
