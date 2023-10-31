import { Link } from "react-router-dom";
import PropType from "prop-types";
import { BsFillStarFill } from "react-icons/bs";

const MovieItem = ({ id, title, imageURL, release, rating }) => {
  return (
    <div className="swapper card">
      <Link as={Link} to={`/details/${id}`} className="card-img relative">
        <img src={imageURL} alt="" className="rounded-md hover:brightness-50" />
        <p className="flex absolute top-0 rounded-md text-sm text-white px-1.5 py-0.5 mt-1.5 ml-1.5 bg-red-600">
          <BsFillStarFill className="mt-0.5 mr-1" />
          {parseFloat(rating).toFixed(1)}
        </p>
      </Link>
      <h4>
        <Link
          as={Link}
          to={`/details/${id}`}
          className="font-semibold block leading-none hover:text-red-500 text-white mt-2.5"
        >
          {title}
        </Link>
      </h4>
      <p className="text-xs text-gray-500 mt-0.5">{release}</p>
    </div>
  );
};

MovieItem.propTypes = {
  id: PropType.number.isRequired,
  title: PropType.string.isRequired,
  release: PropType.string.isRequired,
  imageURL: PropType.string.isRequired,
  rating: PropType.number.isRequired,
};

export default MovieItem;
