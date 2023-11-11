import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Jumbotron from "./Jumbotron";
import MainDetailMovies from "./MainDetailMovies";

const DetailMovies = () => {
  const [movieData, setMovieData] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const { movieId } = useParams();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/movie/${movieId}?language=en-US&append_to_response=videos`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        console.log(response.data);
        setMovieData(response.data);
        const videos = response.data.videos.results;
        const trailer = videos.find((video) => video.type === "Trailer");
        console.log(trailer);

        if (trailer) {
          setTrailerUrl(trailer.key);
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchData();
  }, [movieId]);

  const handleShowTrailer = (event) => {
    event.preventDefault();
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div>
        {movieData ? (
          <>
            <Jumbotron
              imageURL={
                import.meta.env.VITE_API_IMAGE_URL_ORIGIN +
                movieData?.backdrop_path
              }
              handleShowTrailer={handleShowTrailer}
              showPopup={showPopup}
              closePopup={closePopup}
              trailer={trailerUrl}
              voteAverage={movieData?.vote_average}
              voteCount={movieData?.vote_count}
            />
            <MainDetailMovies />
          </>
        ) : (
          <p className="text-white">loading</p>
        )}
      </div>
    </>
  );
};

export default DetailMovies;
