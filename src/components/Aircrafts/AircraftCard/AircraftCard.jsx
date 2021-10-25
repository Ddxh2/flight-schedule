import React, { useContext } from "react";

import { SchedulesContext } from "../../../context";
import { getUtility } from "../../../utils/utils";

import "./AircraftCard.css";

const AircraftCard = ({ ident, onClick, isSelected }) => {
  const {
    schedules: { scheduledFlights },
  } = useContext(SchedulesContext);

  return (
    <article
      className={`aircraftCard__container ${
        isSelected ? "aircraftCard__container-selected" : ""
      }`}
      onClick={onClick}
    >
      <section className='aircraftCard__main'>
        <h3 className='aircraftCard__title'>{ident}</h3>
        <span className='aircraftCard__utility'>
          ({" "}
          {!!scheduledFlights
            ? getUtility(scheduledFlights[ident]).toFixed(2)
            : 0.0}
          % )
        </span>
      </section>
    </article>
  );
};

export default AircraftCard;
