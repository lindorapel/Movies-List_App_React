import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailMovies = () => {
  const [movieData, setMovieData] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const { movieId } = useParams();

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
        setMovieData(response.data);
        const videos = response.data.videos.results;
        const trailer = videos.find((video) => video.type === "Trailer");

        if (trailer) {
          setTrailerUrl(trailer.key);
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchData();
  }, [movieId]);

  return <div>index</div>;
};

export default DetailMovies;
