import PropTypes from "prop-types";
import { IoStarSharp } from "react-icons/io5";
import MovieTrailerPopUp from "../../components/MovieTrailerPopUp";

const Jumbotron = ({
  imageURL,
  trailer,
  voteCount,
  voteAverage,
  showPopup,
  handleShowTrailer,
  closePopup,
}) => {
  return (
    <>
      <div className=" relative">
        <div className="absolute w-full bottom-0 z-50 mb-2">
          <div className="container flex justify-between mx-auto">
            <div className="flex text-white items-center gap-1.5">
              <IoStarSharp className=" text-yellow-400 text-3xl" />
              <div>
                <p className="text-xl font-semibold">
                  {parseFloat(voteAverage).toFixed(1)} / 10
                </p>
                <p className="text-sm">{voteCount} vote</p>
              </div>
            </div>

            {!showPopup && (
              <button
                className="text-white bg-black bg-opacity-60 hover:bg-opacity-30 hover:outline-2 hover:outline hover:outline-red-600 hover:text-red-500 rounded-sm py-3 px-4"
                onClick={handleShowTrailer}
              >
                Watch Trailer
              </button>
            )}

            {showPopup && trailer && (
              <MovieTrailerPopUp trailer={trailer} closePopup={closePopup} />
            )}
          </div>
        </div>
        <img
          src={`${imageURL}`}
          alt=""
          className="object-cover brightness-50 w-full h-64 "
        />
      </div>
    </>
  );
};

Jumbotron.propTypes = {
  showPopup: PropTypes.array.isRequired,
  closePopup: PropTypes.func.isRequired,
  handleShowTrailer: PropTypes.func.isRequired,
  imageURL: PropTypes.string,
  trailer: PropTypes.string,
  voteCount: PropTypes.number,
  voteAverage: PropTypes.number,
};

export default Jumbotron;
