import { createContext, useEffect, useReducer, useContext } from "react";

import { FlightsContext } from "..";
import { validateFlights, formatFlight } from "../../utils/utils";

const ACTION_TYPES = {
  INIT: "INIT",
  PLACE_FLIGHT: "PLACE_FLIGHT",
  ADD_FLIGHT: "ADD_FLIGHT",
  REMOVE_FLIGHT: "REMOVE_FLIGHT",
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.INIT:
      // payload is array of aircraft idents and all flights
      state.unscheduledFlights = payload.flights;

      const scheduledFlights = {};

      for (const ident of payload.idents) {
        const storedSchedule = localStorage.getItem(ident);
        if (!!storedSchedule) {
          scheduledFlights[ident] = JSON.parse(storedSchedule);
          const scheduledIds = scheduledFlights[ident].map(({ id }) => id);
          state.unscheduledFlights = state.unscheduledFlights.filter(
            ({ id }) => !scheduledIds.includes(id)
          );
        } else {
          scheduledFlights[ident] = [];
        }
      }

      state.scheduledFlights = scheduledFlights;
      return { ...state };
    case ACTION_TYPES.ADD_FLIGHT:
      // payload is flight and aircraft ident

      state.unscheduledFlights = state.unscheduledFlights.filter(
        ({ id }) => id !== payload.flight.id
      );

      // variable found is used to prevent a duplication bug

      const found = state.scheduledFlights[payload.ident].find(
        ({ id }) => id === payload.flight.id
      );
      if (!!found) {
        return { ...state };
      }

      if (!!state.scheduledFlights[payload.ident]) {
        state.scheduledFlights[payload.ident].push(payload.flight);
        state.scheduledFlights[payload.ident] = [
          ...state.scheduledFlights[payload.ident],
        ];
      } else {
        state.scheduledFlights[payload.ident] = [payload.flight];
      }
      validateFlights(state.scheduledFlights[payload.ident]);
      return { ...state };
    case ACTION_TYPES.REMOVE_FLIGHT:
      // payload is aircraft ident and flight

      state.scheduledFlights[payload.ident] = state.scheduledFlights[
        payload.ident
      ].filter(({ id }) => id !== payload.flight.id);

      validateFlights(state.scheduledFlights[payload.ident]);

      // variable existing used to prevent a duplication bug

      const existing = state.unscheduledFlights.find(
        ({ id }) => payload.flight.id === id
      );

      if (!existing) {
        state.unscheduledFlights = [...state.unscheduledFlights, payload.flight]
          .sort((flight1, flight2) => (flight1.id < flight2.id ? -1 : 1))
          .map(formatFlight);
      }
      state.unscheduledFlights = [...state.unscheduledFlights];

      return { ...state };
    case ACTION_TYPES.PLACE_FLIGHT:
      // payload is current index, target index and aircraft ident
      const schedule = state.scheduledFlights[payload.ident];

      const flightToMove = schedule.splice(payload.currentIndex, 1)[0];
      const adjustedTargetIndex =
        payload.currentIndex < payload.targetIndex
          ? payload.targetIndex - 1
          : payload.targetIndex;
      schedule.splice(adjustedTargetIndex, 0, flightToMove);

      state.scheduledFlights[payload.ident] = [...schedule];

      validateFlights(state.scheduledFlights[payload.ident]);
      return { ...state };
    default:
      return state;
  }
};

// scheduledFlights= {AIRCRAFT_ID: [flight1, flight2]}

const initialValue = {
  schedules: {},
  ACTION_TYPES: ACTION_TYPES,
  dispatch: () => {},
};

const SchedulesContext = createContext({ ...initialValue });

const SchedulesProvider = ({ children }) => {
  const { flights, aircrafts } = useContext(FlightsContext);

  const [schedules, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    if (!!flights && !!aircrafts) {
      dispatch({
        type: ACTION_TYPES.INIT,
        payload: {
          flights,
          idents: aircrafts.map((aircraft) => aircraft.ident),
        },
      });
    }
  }, [flights, aircrafts]);

  const save = (ident) => {
    localStorage.setItem(
      ident,
      JSON.stringify(schedules.scheduledFlights[ident])
    );

    alert(`Flight Schedule for Aircraft ${ident} has been saved!`);
  };

  return (
    <SchedulesContext.Provider
      value={{ schedules, dispatch, ACTION_TYPES, save }}
    >
      {children}
    </SchedulesContext.Provider>
  );
};

export { SchedulesContext, SchedulesProvider };
