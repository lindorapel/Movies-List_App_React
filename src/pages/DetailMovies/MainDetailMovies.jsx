import PropTypes from "prop-types";

const MainDetailMovies = ({
  handleShowTrailer,
  imageURL,
  title,
  releaseDate,
  runTime,
  genres,
  overview,
  originalTitle,
  status,
  productionCountry,
  productionCompanies,
  spokenLanguages,
  budget,
  revenue,
}) => {
  function convertToTime(runtime) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    const hoursString = hours > 0 ? `${hours}h` : "";
    const minutesString = minutes > 0 ? ` ${minutes}m` : "";

    return `${hoursString}${minutesString}`;
  }

  return (
    <div className="container flex flex-wrap gap-10 py-8 mx-auto">
      <div className=" flex justify-center sm:justify-normal flex-wrap gap-5 w-full lg:w-2/3">
        <div
          className=" overflow-hidden h-max rounded-md"
          style={{ width: "clamp(150px, 30vw, 220px)" }}
        >
          <img
            src={imageURL}
            alt=""
            className="border-2 sm:border-0  border-gray-700 rounded-md"
          />
        </div>
        <div className="flex flex-col basis-80 shrink grow gap-4">
          <div>
            <h1 className="text-white  font-bold text-4xl mb-2">{title}</h1>
            <p className="text-white">
              {releaseDate} | {convertToTime(runTime)}
            </p>
          </div>
          <div className="flex flex-row gap-2.5 flex-wrap">
            {genres.map((genre, index) => (
              <li
                className="list-none rounded-md text-white bg-gray-600 bg-opacity-40 py-2 px-4"
                key={index}
              >
                {genre.name}
              </li>
            ))}
          </div>
          <button
            className="text-white bg-red-700 rounded-md w-max py-3 px-4"
            onClick={handleShowTrailer}
          >
            Watch Trailer
          </button>
          <div className="text-white">
            <h4 className="text-2xl font-semibold">Overview</h4>
            <p>{overview}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col text-white gap-4 w-full md:w-64">
        <div>
          <h4 className="font-bold leading-none mb-0.5">Original Title</h4>
          <p className="font-normal">{originalTitle}</p>
        </div>
        <div>
          <h4 className="font-bold leading-none mb-0.5">Status</h4>
          <p className="font-normal">{status}</p>
        </div>
        <div>
          <h4 className="font-bold leading-none mb-0.5">Production Country</h4>
          <ul className="font-normal">
            {productionCountry.map((country, index) => (
              <li className="list-disc ml-5" key={index}>
                {country.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold leading-none mb-0.5">Production Company</h4>
          <ul className="font-normal">
            {productionCompanies.map((company, index) => (
              <li className="list-disc ml-5" key={index}>
                {company.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold leading-none mb-0.5">Spoken Language</h4>
          <ul className="font-normal">
            {spokenLanguages.map((language, index) => (
              <li className="list-disc ml-5" key={index}>
                {language.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold leading-none mb-0.5">Budget</h4>
          <p className="font-normal">$. {budget.toLocaleString("en-US")}.00</p>
        </div>
        <div>
          <h4 className="font-bold leading-none mb-0.5">Revenue</h4>
          <p className="font-normal">$. {revenue.toLocaleString("en-US")}.00</p>
        </div>
      </div>
    </div>
  );
};

MainDetailMovies.propTypes = {
  showPopup: PropTypes.func,
  closePopup: PropTypes.func,
  trailer: PropTypes.arrayOf(PropTypes.shape({})),
  handleShowTrailer: PropTypes.func,
  imageURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  runTime: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  overview: PropTypes.string.isRequired,
  originalTitle: PropTypes.string,
  status: PropTypes.string,
  productionCountry: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
  productionCompanies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
  spokenLanguages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
  budget: PropTypes.number,
  revenue: PropTypes.number,
};

export default MainDetailMovies;
