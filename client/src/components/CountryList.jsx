/* eslint-disable react/prop-types */

import CountryItem from "./CountryItem.jsx";

import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import { useCities } from "../contexts/CitiesContext.jsx";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking a city on the map" />
    );

  const countries = cities.reduce(
    (arr, city) => {
      if (!arr.map((el) => el.country).includes(city.country))
        return [...arr, { country: city.country, emoji: city.emoji }];
      else return arr;
    },

    []
  );

  function createCountryItem(Country) {
    return <CountryItem country={Country} key={Country.country} />;
  }

  return (
    <ul className="flex flex-row flex-wrap gap-5 mx-5 overflow-auto">
      {countries.map(createCountryItem)}
    </ul>
  );
}

export default CountryList;
