import { useEffect, useState } from "react";
import axios from "axios";
import MovieItem from "../../components/MovieItem";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const NowPlayingList = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/movie/now_playing`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );

        const { data } = response;

        setPopularMovies(data?.results);
        setErrors({ ...errors, isError: false });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrors({
            ...errors,
            isError: true,
            message: error?.response?.data?.status_message || error?.message,
          });

          return;
        }

        alert(error?.message);
        setErrors({
          ...errors,
          isError: true,
          message: error?.message,
        });
      }
    };

    getPopularMovies();
  }, []);

  if (errors.isError) {
    return <h1>{errors.message}</h1>;
  }
  if (popularMovies.length === 0) {
    return <span>a</span>;
  }

  return (
    <>
      <div className="container mx-auto mt-8">
        <div className="featured flex justify-between mb-3">
          <p className="text-2xl font-semibold border-solid border-l-4 border-red-600 text-white pl-2.5 mb-2.5">
            Now Playing Movies
          </p>
          <Link
            className="leading-none flex font-normal hover:text-red-600 text-white mt-2.5"
            to="/popular-movies"
          >
            See More <BsArrowRight className=" ml-2 mt-0.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
          {popularMovies.slice(0, 12).map((movie) => (
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
      </div>
    </>
  );
};

export default NowPlayingList;
