import React, { useContext, useState, useEffect } from "react";

import RotationCard from "../RotationCard/RotationCard";
import { SchedulesContext } from "../../../context";

import "./Schedule.css";

const Schedule = ({ scheduledFlights, selectedAircraft }) => {
  const { dispatch, ACTION_TYPES } = useContext(SchedulesContext);
  const [scheduleToDisplay, setScheduleToDisplay] = useState(scheduledFlights);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragSourceIndex, setDragSourceIndex] = useState(null);
  const [dragTargetIndex, setDragTargetIndex] = useState(null);

  const onRemoveFlight = (flight) => {
    if (!!selectedAircraft) {
      dispatch({
        type: ACTION_TYPES.REMOVE_FLIGHT,
        payload: { ident: selectedAircraft, flight },
      });
    }
  };

  const onDragStart = (flight, index) => {
    setDraggedItem(flight);
    setDragSourceIndex(index);
  };

  const onDragOverCard = (event, index) => {
    event.preventDefault();
    setDragTargetIndex(index);
  };

  const onDrop = (event) => {
    event.preventDefault();
    dispatch({
      type: ACTION_TYPES.PLACE_FLIGHT,
      payload: {
        currentIndex: dragSourceIndex,
        targetIndex: dragTargetIndex,
        ident: selectedAircraft,
      },
    });
    setDraggedItem(null);
    setDragSourceIndex(null);
    setDragTargetIndex(null);
  };

  useEffect(() => {
    setScheduleToDisplay(scheduledFlights);
  }, [scheduledFlights]);

  useEffect(() => {
    if (!!draggedItem && !!dragTargetIndex) {
      setScheduleToDisplay((prev) => {
        const currentIndexOfDraggedItem = prev.findIndex(
          ({ id }) => id === draggedItem.id
        );

        if (currentIndexOfDraggedItem === dragTargetIndex) {
          return prev;
        }

        const scheduleCopy = [...prev].filter(
          ({ id }) => id !== draggedItem.id
        );

        const adjustedTargetIndex =
          currentIndexOfDraggedItem < dragTargetIndex
            ? dragTargetIndex - 1
            : dragTargetIndex;

        scheduleCopy.splice(adjustedTargetIndex, 0, draggedItem);

        return scheduleCopy;
      });
    }
  }, [draggedItem, dragTargetIndex]);
  return (
    <div
      className={`schedule__container ${
        !scheduleToDisplay || !scheduleToDisplay.length
          ? "schedule__container-empty"
          : ""
      }`}
    >
      {!scheduleToDisplay || !scheduleToDisplay.length ? (
        <p className='schedule__noScheduledFlights'>
          No flights scheduled. Please add a flight by clicking on it in the
          <span> Flights </span> column on the right in order to get started.
        </p>
      ) : (
        <div
          className='schedule__dropOverContainer'
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          {scheduleToDisplay.map((flight, index) => (
            <div
              className='schedule__draggableContainer'
              draggable
              onDragStart={() => onDragStart(flight, index)}
              onDragOver={(e) => onDragOverCard(e, index)}
              key={flight.id}
            >
              <RotationCard
                flight={flight}
                isDragged={!!draggedItem && draggedItem.id === flight.id}
                onRemove={() => onRemoveFlight(flight)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Schedule;
