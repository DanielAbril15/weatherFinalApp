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
      <img src={`/assets/image/${day.weather}.png`} alt="wather" />
      <p className="temp-prediction">
        <span>
          Max:{" "}
          {isCelsius
            ? `${day.temp2m.max} °C `
            : `${(day.temp2m.max * 9) / 5 + 32} °F`}
        </span>
        <span>
          Min:
          {isCelsius
            ? `${day.temp2m.min} °C `
            : `${(day.temp2m.min * 9) / 5 + 32} °F`}
        </span>
      </p>
    </div>
  );
};

export default DaysCard;
