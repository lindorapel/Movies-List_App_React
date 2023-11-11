import PropTypes from "prop-types";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
// import "./style.css";

const Carousels = ({ id, imageURL, title, overview }) => {
  return (
    <div className="">
      <img
        src={imageURL}
        className="object-cover w-full h-screen brightness-50"
      />
      <div className="flex flex-col gap-6 justify-center absolute bottom-1 h-screen w-full md:w-3/4 lg:w-1/2 py-12a px-4 sm:px-28 md:pr-0">
        <h1 className="mb-1 text-white font-semibold text-4xl">{title}</h1>
        <p className="text-lg text-white font-normal">{overview}</p>
        <Link
          className="flex text-lg font-medium text-white bg-red-600 bg-opacity-90 hover:bg-red-800 rounded-sm w-max px-5 py-3"
          to={`/details/${id}`}
        >
          More Details
          <MdKeyboardArrowRight className="ml-1.5" size={30} />
        </Link>
      </div>
    </div>
  );
};

Carousels.propTypes = {
  id: PropTypes.number.isRequired,
  imageURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  trailer: PropTypes.number.isRequired,
};

export default Carousels;
