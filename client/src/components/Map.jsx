import { useNavigate } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";

import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";

import { useUrlPosition } from "../hooks/useUrlPosition";
import Sidebar from "./Sidebar";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const { isHistoryActive, setIsHistoryActive } = useCities();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  function handleYourHistoryCLick() {
    setIsHistoryActive(!isHistoryActive);
  }

  return (
    <>
      {isHistoryActive && (
        <div className="md:hidden w-full h-full flex items-center fixed top-0 z-[100000]">
          <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/[0.3] z-[100]"></div>
          <Sidebar handleClick={handleYourHistoryCLick} />
        </div>
      )}
      <div className="h-screen md:w-[65%]">
        <div className=" w-full md:w-[60%] flex flex-col items-center gap-2 md:flex-row md:justify-center fixed bottom-10 z-[1000]">
          <button
            className=" bg-[#192939] text-[#f1dcbf]  rounded-[32px] py-2 px-4 font-normal text-sm "
            type="position"
            onClick={getPosition}
          >
            {isLoadingPosition ? "Loading..." : "Use Your Location"}
          </button>

          <div className="  md:hidden w-[80%] h-[75px]     flex justify-between items-center bg-[#192939] rounded-[16px] p-4">
            <img src="logo.png" className="w-[75px]" />
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleYourHistoryCLick}
                className="w-[100%] bg-[#f1dcbf] text-[#192939]  rounded-[32px] py-2 px-4 font-normal text-sm"
              >
                Your History
              </button>
            </div>
          </div>
        </div>

        <MapContainer
          className="h-screen "
          center={mapPosition}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {cities.map((city) => (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          ))}
          <ChangeCenter position={mapPosition} />
          <DetectClick handleClick={handleYourHistoryCLick} />
        </MapContainer>
      </div>
    </>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick({ handleClick }) {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      handleClick();
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
