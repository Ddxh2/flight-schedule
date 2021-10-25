import React, { useState, useContext } from "react";

import {
  Aircrafts,
  Column,
  DateDisplay,
  Flights,
  Rotation,
} from "../../components";
import { SchedulesContext } from "../../context";

import "./Home.css";

const saveDisabled = (ident, scheduledFlights) => {
  if (
    !ident ||
    !scheduledFlights ||
    !scheduledFlights[ident] ||
    !scheduledFlights[ident].length
  ) {
    return true;
  }

  const storage = localStorage.getItem(ident);

  const allValid = scheduledFlights[ident].every(
    ({ origin_valid, destination_valid, departure_valid, arrival_valid }) =>
      origin_valid && destination_valid && departure_valid && arrival_valid
  );

  if (storage === JSON.stringify(scheduledFlights[ident]) || !allValid) {
    return true;
  }
  return false;
};

const Home = () => {
  const {
    schedules: { scheduledFlights },
    save,
  } = useContext(SchedulesContext);

  const [selectedAircraft, setSelectedAircraft] = useState(null);
  return (
    <div className='home__container'>
      <header>
        <DateDisplay />
      </header>
      <section className='home__body'>
        <Column title='Aircrafts'>
          <Aircrafts
            selectedAircraft={selectedAircraft}
            onSelect={(ident) =>
              setSelectedAircraft((prev) => (prev === ident ? null : ident))
            }
          />
        </Column>
        <Column
          title={`Rotation${!!selectedAircraft ? `: ${selectedAircraft}` : ""}`}
        >
          <Rotation selectedAircraft={selectedAircraft} />
        </Column>

        <Column title='Flights'>
          <Flights selectedAircraft={selectedAircraft} />
        </Column>
      </section>
      <footer className='home__footer'>
        <button
          className='home__save'
          disabled={saveDisabled(selectedAircraft, scheduledFlights)}
          onClick={() => save(selectedAircraft)}
        >
          Save
        </button>
      </footer>
    </div>
  );
};

export default Home;
