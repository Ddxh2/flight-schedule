import React from "react";

import "./FlightCard.css";

const FlightCard = ({ flight, onClick }) => {
  const { id, origin, destination, readable_arrival, readable_departure } =
    flight;
  return (
    <article className='flightCard__container' onClick={onClick}>
      <h3 className='flightCard__header'>{id}</h3>
      <section className='flightCard__body'>
        <div className='flightCard__column'>
          <span className='flightCard__location'>{origin}</span>
          {readable_departure}
        </div>
        <div className='flightCard__column'>
          <span className='flightCard__location'>{destination}</span>
          {readable_arrival}
        </div>
      </section>
    </article>
  );
};

export default FlightCard;
