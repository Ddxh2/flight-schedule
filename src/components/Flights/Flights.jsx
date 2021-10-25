import React, { useContext } from "react";

import { SchedulesContext } from "../../context";
import FlightCard from "./FlightCard/FlightCard";

import "./Flights.css";

const Flights = ({ selectedAircraft }) => {
  const {
    schedules: { unscheduledFlights },
    ACTION_TYPES,
    dispatch,
  } = useContext(SchedulesContext);

  const onFlightCardClick = (flight) => {
    if (!!selectedAircraft) {
      dispatch({
        type: ACTION_TYPES.ADD_FLIGHT,
        payload: { flight, ident: selectedAircraft },
      });
    }
  };

  return (
    <div className='flights__container'>
      {!!unscheduledFlights
        ? !!unscheduledFlights.length
          ? unscheduledFlights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                onClick={() => onFlightCardClick(flight)}
              />
            ))
          : "No Flights Remaining"
        : "Loading"}
    </div>
  );
};

export default Flights;
