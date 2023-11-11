import YouTube from "react-youtube";
import PropTypes from "prop-types";

const MovieTrailerPopUp = ({ trailer, closePopup }) => {
  const opts = {
    width: "640px",
    aspecRatio: 16 / 100,
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div className="flex fixed top-0 left-0 bg-black bg-opacity-50 justify-center items-center w-full h-full z-40">
      <button
        className="text-white bg-black bg-opacity-50 absolute border-0  w-full h-full"
        onClick={closePopup}
      >
        Loading
      </button>
      <YouTube
        className="z-50 p-16"
        style={{ zIndex: "100" }}
        videoId={trailer}
        opts={opts}
      />
    </div>
  );
};

MovieTrailerPopUp.propTypes = {
  trailer: PropTypes.array.isRequired,
  closePopup: PropTypes.func,
};

export default MovieTrailerPopUp;
