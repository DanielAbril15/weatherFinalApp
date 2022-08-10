import React, { useEffect, useState } from "react";
import "./daysCard.css";

const DaysCard = ({ day, isCelsius }) => {
  const parsearDate = (value) => {
    value = "" + value;
    if (!value) {
      return "";
    }
    let year = value.substring(0, 4);
    let month = value.substring(4, 6);
    let dayy = value.substring(6, 8);
    return dayy + "-" + month + "-" + year;
  };

  return (
    <div className="day-container">
      <p className="date">{parsearDate(day.date)}</p>
      <img src={`../../public/assets/image/${day.weather}.png`} alt="wather" />
      <p className="temp-prediction">
        <span>
          Max: {day.temp2m.max} {isCelsius ? "°C " : "°F"}
        </span>
        <span>
          Min: {day.temp2m.min}
          {isCelsius ? "°C " : "°F"}
        </span>
      </p>
    </div>
  );
};

export default DaysCard;
