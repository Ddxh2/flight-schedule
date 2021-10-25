import React, { useState, useEffect, createContext } from "react";

import { apiFetch } from "../../utils/utils";

const initialValue = {};

const FlightsContext = createContext({
  ...initialValue,
});

const FlightsProvider = ({ children }) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    const fetchData = async () => {
      await apiFetch(
        "https://infinite-dawn-93085.herokuapp.com/flights",
        "GET",
        (data) => setState((prev) => ({ ...prev, flights: !!data ? data : [] }))
      );
      await apiFetch(
        "https://infinite-dawn-93085.herokuapp.com/aircrafts",
        "GET",
        (data) =>
          setState((prev) => ({ ...prev, aircrafts: !!data ? data : [] }))
      );
    };
    fetchData();
  }, []);

  return (
    <FlightsContext.Provider value={state}>{children}</FlightsContext.Provider>
  );
};

export { FlightsContext, FlightsProvider };
