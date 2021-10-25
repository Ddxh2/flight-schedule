export const TWENTY_MINUTES = 1200; // 20 minutes in seconds
export const DAY = 86400; // 24 hours in seconds

// Check if any two consecutive flights are valid and if not, modify them in place

export const validateFlights = (flights) => {
  for (let i = 0; i < flights.length - 1; i++) {
    const currentFlight = flights[i];
    const nextFlight = flights[i + 1];

    const { location, time } = checkValidPair(currentFlight, nextFlight);

    currentFlight["destination_valid"] = location;
    currentFlight["arrival_valid"] = time;

    nextFlight["origin_valid"] = location;
    nextFlight["departure_valid"] = time;
  }

  if (flights.length > 0) {
    flights[0]["origin_valid"] = true;
    flights[0]["departure_valid"] = true;

    flights[flights.length - 1]["destination_valid"] = true;
    flights[flights.length - 1]["arrival_valid"] = true;
  }
};

// Check if two consecutive flights are valid

export const checkValidPair = (firstFlight, secondFlight) => {
  let location = true;
  let time = true;
  // Conflict 1 - Wrong Airport

  if (firstFlight.destination !== secondFlight.origin) {
    location = false;
  }

  // Conflict 2 - Invalid Times With 20min Buffer

  if (
    parseInt(firstFlight.arrivaltime) + TWENTY_MINUTES >
    parseInt(secondFlight.departuretime)
  ) {
    time = false;
  }

  return { location, time };
};

// Return only the fields from the original api response

export const formatFlight = (flight) => {
  const {
    id,
    arrivaltime,
    departuretime,
    origin,
    destination,
    readable_arrival,
    readable_departure,
  } = flight;
  return {
    id,
    arrivaltime,
    departuretime,
    origin,
    destination,
    readable_arrival,
    readable_departure,
  };
};

// Given scheduled flights, calculate % of 24hours used

export const getUtility = (schedule) => {
  if (!schedule || !schedule.length) {
    return 0;
  }
  // We will subtract 20 minutes from the total 24hours for every gap there is
  // to ignore the impact of the mandatory 20 minute turnover
  schedule = schedule.filter((flight) => {
    const { origin_valid, destination_valid, arrival_valid, departure_valid } =
      flight;
    return (
      origin_valid && departure_valid && arrival_valid && destination_valid
    );
  });
  const minGaps = Math.max((schedule.length - 1) * TWENTY_MINUTES, 0);
  const totalTime = DAY - minGaps;

  const scheduledTime = schedule.reduce((accumulatedTime, currentFlight) => {
    const { arrivaltime, departuretime } = currentFlight;
    return accumulatedTime + parseInt(arrivaltime) - parseInt(departuretime);
  }, 0);

  return 100 * (scheduledTime / totalTime);
};

// Function to fetch data from api and handle errors

export const apiFetch = async (
  endpoint,
  method,
  onSuccess = () => {},
  onError = () => {}
) => {
  const [data, error] = await fetch(endpoint, { method })
    .then((res) => res.json())
    .then((json) => [json.data, null])
    .catch((error) => [null, error]);

  if (!!error) {
    console.error(error);
    onError(error);
  } else {
    onSuccess(data);
  }
  return data;
};
