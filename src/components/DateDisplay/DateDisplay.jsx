import React from "react";

import "./DateDisplay.css";

const getDateTomorrow = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateToday = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(dateToday.getDate() + 1);

  const date = tomorrow.getDate();
  const month = months[tomorrow.getMonth()];
  const year = tomorrow.getFullYear();

  let dateSuffix = "";

  if (date % 10 === 1 && date !== 1) {
    dateSuffix = "st";
  } else if (date % 10 === 2 && date !== 12) {
    dateSuffix = "nd";
  } else if (date % 10 === 3 && date !== 13) {
    dateSuffix = "rd";
  } else {
    dateSuffix = "th";
  }

  return `${date}${dateSuffix} ${month} ${year}`;
};

const DateDisplay = () => {
  return <h4 className='dateDisplay__date'>{getDateTomorrow()}</h4>;
};

export default DateDisplay;
