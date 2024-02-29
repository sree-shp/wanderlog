/* eslint-disable react/prop-types */
import CityItem from "./CityItem.jsx";
import styles from "./CityList.module.css";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import { useCities } from "../contexts/CitiesContext.jsx";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking a city on the map" />
    );

  function createCityItem(cityItem) {
    return <CityItem city={cityItem} key={cityItem.id} />;
  }

  return <ul className={styles.cityList}>{cities.map(createCityItem)}</ul>;
}

export default CityList;
