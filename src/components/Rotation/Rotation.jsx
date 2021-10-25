import React, { useMemo, useContext } from "react";

import { Schedule, Timeline } from "./";
import { SchedulesContext } from "../../context";

import "./Rotation.css";

const Rotation = ({ selectedAircraft }) => {
  const { schedules } = useContext(SchedulesContext);

  const rotation = useMemo(
    () =>
      !!schedules && !!selectedAircraft
        ? schedules.scheduledFlights[selectedAircraft]
        : [],
    [schedules, selectedAircraft]
  );

  return (
    <div className='rotation__container'>
      {selectedAircraft ? (
        <>
          <Schedule
            scheduledFlights={rotation}
            selectedAircraft={selectedAircraft}
          />
          <Timeline scheduledFlights={rotation} />
        </>
      ) : (
        <p className='rotation__noSelectedAircraft'>
          There is no aircraft selected. Please select an aircraft from the
          <span> Aircrafts </span> column on the left to continue
        </p>
      )}
    </div>
  );
};

export default Rotation;
