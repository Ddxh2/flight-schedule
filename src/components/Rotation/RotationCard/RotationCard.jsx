import React from "react";

import "./RotationCard.css";

const RotationCard = ({ flight = {}, isDragged, onRemove }) => {
  const {
    id,
    origin,
    destination,
    readable_departure,
    readable_arrival,
    arrival_valid,
    origin_valid,
    departure_valid,
    destination_valid,
  } = flight;
  return (
    <article
      className={`rotationCard__container ${
        isDragged ? "rotationCard__container-dragged" : ""
      }`}
    >
      <div className='rotationCard__draggable'>
        <i className='fas fa-bars'></i>
      </div>
      <div className='rotationCard__main'>
        <header className='rotationCard__header'>
          <h3 className='rotationCard__title'>Flight: {id}</h3>
          <div className='rotationCard__remove' onClick={onRemove}>
            x
          </div>
        </header>
        <section className='rotationCard__body'>
          <div className='rotationCard__column'>
            <span
              className={`rotationCard__location ${
                !origin_valid ? "rotationCard__invalid" : ""
              }`}
            >
              {origin}
            </span>
            <span className={!departure_valid ? "rotationCard__invalid" : ""}>
              {readable_departure}
            </span>
          </div>
          <div className='rotationCard__column'>
            <i className='fas fa-long-arrow-alt-right fa-4x'></i>
          </div>
          <div className='rotationCard__column'>
            <span
              className={`rotationCard__location ${
                !destination_valid ? "rotationCard__invalid" : ""
              }`}
            >
              {destination}
            </span>
            <span className={!arrival_valid ? "rotationCard__invalid" : ""}>
              {readable_arrival}
            </span>
          </div>
        </section>
      </div>
    </article>
  );
};

export default RotationCard;
