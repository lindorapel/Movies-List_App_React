import { useState, useEffect } from "react";
import axios from "axios";
import Carousels from "../../components/Carousels";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PropTypes from "prop-types";
// import "../../components/style.css";

const responsive = {
  universal: {
    breakpoint: { max: 3000, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const HeroCarousel = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/trending/movie/day`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );

        const { data } = response;

        setTrendingMovies(data?.results);
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

    getTrendingMovies();
  }, []);

  if (errors.isError) {
    return <h1>{errors.message}</h1>;
  }
  if (trendingMovies.length === 0) {
    return <span>a</span>;
  }

  const CustomDot = ({ onClick, ...rest }) => {
    const { active } = rest;
    return (
      <div
        className={
          active
            ? "active bg-red-600  rounded-full mx-1 mb-5"
            : "inactive rounded-full mx-1 mb-5 bg-red-200"
        }
        onClick={() => onClick()}
      >
        <div className=" gap-2.5 w-2.5 h-2.5 "></div>
      </div>
    );
  };

  return (
    <div className="parent">
      <Carousel
        responsive={responsive}
        autoPlay={true}
        swipeable={false}
        draggable={false}
        showDots={true}
        customDot={<CustomDot />}
        infinite={true}
        partialVisible={false}
        dotListClass="custom-dot-list-style"
      >
        {trendingMovies.slice(0, 5).map((movie) => {
          return (
            <div className="slider" key={movie.id}>
              <Carousels
                id={movie?.id}
                title={movie?.title}
                overview={movie?.overview}
                imageURL={
                  import.meta.env.VITE_API_IMAGE_URL_ORIGIN +
                  movie?.backdrop_path
                }
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

HeroCarousel.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default HeroCarousel;
