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
  const [weather, setWeather] = useState();

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
          const URL = `http://www.7timer.info/bin/civillight.php?lon=${lon}&lat=${lat}&ac=0&unit=metric&output=json`;
          axios
            .get(URL)
            .then((res) => setWeather(res.data.dataseries))
            .catch((err) => console.log(err));
          setTemperture(temp);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [lat, lon]);

  const changeTemperture = () => setIsCelsius(!isCelsius);
  console.log(weather);
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
          <button className="button-temperture" onClick={changeTemperture}>
            {isCelsius ? "Change to °F" : "Change to °C"}
          </button>
        </section>

        <section className="information">
          <div className="prediction-container">
            {weather?.map((day) => (
              <DaysCard key={day.date} day={day} isCelsius={isCelsius} />
            ))}
          </div>

          <section className="hightlights">
            <h3>Today's Highlights</h3>
            <article className="current-hightlights">
              <div className="wind card-hightlights">
                <p>Wind</p>
                <p>
                  {location?.wind.speed} <span>m/s</span>
                </p>
              </div>
              <div className="humidity card-hightlights">
                <p>humidity</p>
                <p>
                  {location?.main.humidity} <span>%</span>
                </p>
              </div>
              <div className="clouds card-hightlights">
                <p>Clouds</p>
                <p>
                  {location?.clouds.all} <span>%</span>
                </p>
              </div>
              <div className="pressure card-hightlights">
                <p>Pressure</p>
                <p>
                  {location?.main.pressure} <span>hpa</span>
                </p>
              </div>
            </article>
          </section>
        </section>
      </div>
    );
  }
};
export default PrincipalCard;
