import { Link } from "react-router-dom";
import PropType from "prop-types";
import { BsFillStarFill } from "react-icons/bs";

const MovieItem = ({ id, title, imageURL, release, rating }) => {
  return (
    <Link as={Link} to={`/movie/${id}`} className="swapper card group">
      <Link as={Link} to={`/movie/${id}`} className="card-img relative">
        <img
          src={imageURL}
          alt="movie"
          className="rounded-md group-hover:brightness-50 "
        />
        <p className="flex absolute top-0 rounded-md text-sm text-white px-1.5 py-0.5 mt-1.5 ml-1.5 bg-red-600">
          <BsFillStarFill className="mt-0.5 mr-1" />
          {parseFloat(rating).toFixed(1)}
        </p>
      </Link>
      <h4>
        <Link
          as={Link}
          to={`/movie/${id}`}
          className="font-semibold block leading-none group-hover:text-red-500 text-white mt-2.5"
        >
          {title}
        </Link>
      </h4>
      <p className="text-xs text-gray-500 mt-0.5">{release}</p>
    </Link>
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
