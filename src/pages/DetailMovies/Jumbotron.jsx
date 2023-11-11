import PropTypes from "prop-types";
import { IoStarSharp } from "react-icons/io5";

const Jumbotron = ({ imageURL, trailer, voteCount, voteAverage }) => {
  return (
    <>
      <div className=" relative">
        <div className="absolute w-full bottom-0 z-50">
          <div className="container flex justify-between mx-auto">
            <div className="flex text-white items-center gap-1.5">
              <IoStarSharp className=" text-yellow-500 text-3xl" />
              <div>
                <p className="text-xl font-semibold">
                  {parseFloat(voteAverage).toFixed(1)} / 10
                </p>
                <p className="text-sm">{voteCount} vote</p>
              </div>
            </div>
            <button className="text-white">{trailer}</button>
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
  imageURL: PropTypes.string,
  trailer: PropTypes.string,
  voteCount: PropTypes.number,
  voteAverage: PropTypes.number,
};

export default Jumbotron;
