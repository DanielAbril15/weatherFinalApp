import React, { useEffect, useState } from "react";
import axios from "axios";

const DaysCard = ({ lat, lon }) => {
  const [weather, setWeather] = useState();
  useEffect(() => {
    if (lat) {
      const URL = `http://www.7timer.info/bin/civillight.php?lon=${lon}&lat=${lat}&ac=0&unit=metric&output=json`;
      axios
        .get(URL)
        .then((res) => setWeather(res.data))
        .catch((err) => console.log(err));
    }
  }, [lat, lon]);

  return <div>DaysCard</div>;
};

export default DaysCard;
