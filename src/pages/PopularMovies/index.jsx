import { useState, useEffect } from "react";
import MovieItem from "../../components/MovieItem";
import axios from "axios";

const PopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  const fetchPopularMovies = async (page) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/movie/popular?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
          },
        }
      );
      return response.data.results;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors({
          ...errors,
          isError: true,
          message: error?.response?.data?.status_message || error?.message,
        });
      } else {
        alert(error?.message);
        setErrors({
          ...errors,
          isError: true,
          message: error?.message,
        });
      }
    }
  };

  const handleError = (error) => {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.status_message || error.message;
    }
    return error.message;
  };

  const loadNextPage = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const nextPage = currentPage + 1;
      const data = await fetchPopularMovies(nextPage);

      setPopularMovies((prevMovies) => [...prevMovies, ...data]);
      setCurrentPage(nextPage);
      setErrors({ isError: false });
    } catch (error) {
      const errorMessage = handleError(error);
      alert(errorMessage);
      setErrors({ isError: true, message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const data = await fetchPopularMovies(1);
        setPopularMovies(data);
        setErrors({ isError: false });
      } catch (error) {
        const errorMessage = handleError(error);
        alert(errorMessage);
        setErrors({ isError: true, message: errorMessage });
      }
    };

    getPopularMovies();
  }, []);

  return (
    <div className="container mx-auto pt-20">
      <div className="featured flex justify-between mb-3">
        <p className="text-2xl font-semibold border-solid border-l-4 border-red-600 text-white pl-2.5 mb-2.5">
          Popular Movies
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
        {popularMovies.map((movie) => (
          <>
            <div className="" key={movie?.id}>
              <MovieItem
                id={movie?.id}
                imageURL={
                  import.meta.env.VITE_API_IMAGE_URL + movie?.poster_path
                }
                overview={movie?.overview}
                title={movie?.title}
                rating={movie?.vote_average}
                release={movie?.release_date}
              />
            </div>
          </>
        ))}
      </div>
      <div className="text-white text-center ">
        <button
          className="rounded-sm bg-red-700 hover:bg-red-900 mt-4 mb-10 p-4 py-3"
          onClick={loadNextPage}
          //   disabled={loading}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default PopularMovies;
