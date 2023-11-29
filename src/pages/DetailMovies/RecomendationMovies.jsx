import { useEffect, useState } from "react";
import axios from "axios";
import MovieItem from "../../components/MovieItem";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 7.5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7.5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 4.5,
  },
  miniTablet: {
    breakpoint: { max: 640, min: 464 },
    items: 3.5,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2.5,
  },
};

const RecomendationMovies = ({ movieId }) => {
  const [recomendationMovies, setRecomendationMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecomendationMovies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/movie/${movieId}/recommendations`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );

        const { data } = response;
        setRecomendationMovies(data?.results || []);
      } catch (error) {
        setError(
          error?.response?.data?.status_message ||
            error?.message ||
            "Error fetching similar movies"
        );
      }
    };

    if (movieId) {
      fetchRecomendationMovies();
    }
  }, [movieId]);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="featured flex justify-between mt-8 mb-4">
        <p className="uppercase text-2xl font-semibold border-solid border-l-4 border-red-600 text-white pl-2.5 mb-2.5">
          Recommendations <span className="text-red-600">Movies</span>
        </p>
        <Link
          className="leading-none flex font-normal hover:text-red-600 text-white mt-2.5"
          to={`/movie/recommendations/${movieId}`}
        >
          See More <BsArrowRight className=" ml-2 mt-0.5" />
        </Link>
      </div>
      <Carousel className="container mx-auto p-0" responsive={responsive}>
        {recomendationMovies.slice(0, 10).map((movie) => (
          <div className="mx-2.5" key={movie?.id}>
            <MovieItem
              id={movie?.id}
              imageURL={import.meta.env.VITE_API_IMAGE_URL + movie?.poster_path}
              overview={movie?.overview}
              title={movie?.title}
              rating={movie?.vote_average}
              release={movie?.release_date}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

RecomendationMovies.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default RecomendationMovies;
