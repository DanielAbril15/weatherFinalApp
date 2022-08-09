import React, { useEffect, useState } from "react";
import axios from "axios";
import DaysCard from "./DaysCard";
import Loading from "./Loading";
import "./principalCard.css";

const PrincipalCard = ({ lat, lon }) => {
  const [location, setLocation] = useState();
  const [temperture, setTemperture] = useState();
  const [isCelsius, setIsCelsius] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (lat) {
      const URLLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b8dd441b0d95ff01132d2f3091f377d6`;
      axios
        .get(URLLocation)
        .then((res) => {
          setLocation(res.data);
          const temp = {
            celsius: `${Math.round(res.data.main.temp - 273.15)} °C`,
            farenheit: `${Math.round(
              ((res.data.main.temp - 273.15) * 9) / 5 + 32
            )} °F`,
          };
          setTemperture(temp);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [lat, lon]);
  console.log(location);
  const changeTemperture = () => setIsCelsius(!isCelsius);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div>
        <section className="current-weather">
          <img
            src={`http://openweathermap.org/img/wn/${location?.weather[0].icon}@4x.png`}
            alt="weather Icon"
          ></img>
          <p className="current-weather_temperture">
            {isCelsius ? temperture?.celsius : temperture?.farenheit}
          </p>
          <p className="current-weather_description">
            {location?.weather[0].description}
          </p>
          <p className="current-weather_location">
            {location?.name}, {location?.sys.country}
          </p>
          <button onClick={changeTemperture}>
            {isCelsius ? "change to °F" : "change to °C"}
          </button>
        </section>
        <DaysCard lat={lat} lon={lon} />
        <section className="current-hightlights"></section>
      </div>
    );
  }
};
export default PrincipalCard;
