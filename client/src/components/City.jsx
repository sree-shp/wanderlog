import { useParams } from "react-router-dom";

import { useEffect } from "react";
import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();
  // TEMP DATA
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };

  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className="h-[250px] bg-[#fbf5ec] mx-5 px-2 py-6 rounded-md flex flex-col gap-5 overflow-auto">
      <div className="">
        <h6>City name</h6>
        <h3 className="text-xl font-semibold">{cityName}</h3>
      </div>

      <div className="">
        <h6>You went to {cityName} on</h6>
        <p className="text-xl font-semibold">{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className="">
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className="">
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
