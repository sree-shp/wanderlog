/* eslint-disable react/prop-types */
import { useCities } from "../contexts/CitiesContext";

import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, _id, position } = city;

  function handleClick(e) {
    e.preventDefault();
    deleteCity(_id);
  }
  return (
    <li>
      <Link
        className="flex flex-row justify-between  bg-[#fbf5ec]  px-4 py-3 rounded-md overflow-x-hidden"
        to={`${_id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <h3 className="font-medium">{cityName}</h3>
        <time className="">{formatDate(date)}</time>
        <button onClick={handleClick} className="">
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
