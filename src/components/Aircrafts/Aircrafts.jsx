import React, { useContext } from "react";

import { FlightsContext } from "../../context";
import AircraftCard from "./AircraftCard/AircraftCard";

import "./Aircrafts.css";

const Aircrafts = ({ selectedAircraft, onSelect }) => {
  const { aircrafts } = useContext(FlightsContext);
  return (
    <div className='aircrafts__container'>
      {!!aircrafts
        ? aircrafts.map(({ ident }) => (
            <AircraftCard
              ident={ident}
              isSelected={ident === selectedAircraft}
              key={ident}
              onClick={() => onSelect(ident)}
            />
          ))
        : "Loading"}
    </div>
  );
};

export default Aircrafts;
