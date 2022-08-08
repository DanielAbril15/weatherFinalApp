import React, { useEffect, useState } from "react";
import axios from "axios";
const PrincipalCard = ({ lat, lon }) => {
  const [weather, setWeather] = useState();
  useEffect(() => {
    if (lat) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b8dd441b0d95ff01132d2f3091f377d6`;
      axios
        .get(URL)
        .then((res) => setWeather(res.data))
        .catch((err) => console.log(err));
    }
  }, [lat, lon]);

  return <div>PrincipalCard</div>;
};

export default PrincipalCard;
