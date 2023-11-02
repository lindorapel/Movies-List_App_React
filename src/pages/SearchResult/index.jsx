import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

function HasilPencarian() {
  const [searchParams] = useSearchParams();
  const [searchMovie, setSearchMovie] = useState([]);

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
        // console.error(error);
      }
    };
    getSearchMovie();
  }, [query, page]);

  //   console.log(searchMovie);

  return (
    <>
      <div className="w-full bg-black">
        <h1 className="text-white font-semibold text-3xl pt-28 ml-6 md:text-4xl md:ml-10 md:pt-28 mb-5">
          {`Search = ${query}`}
        </h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-2">
          {searchMovie.map((search) => (
            <div
              key={search.id}
              className="border-2 border-red-800 hover:border-white p-2 m-4 flex justify-center cursor-pointer"
            >
              <Link to={`/detail-film/${search.id}`}>
                <img
                  src={import.meta.env.VITE_BASEIMGURL + search.poster_path}
                  alt="Poster_movie"
                  className="flex justify-center items-center content-center opacity-60 hover:opacity-100 "
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HasilPencarian;
