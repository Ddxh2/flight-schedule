import React, { useMemo } from "react";

import TimelineBlock, {
  TIMELINE_BLOCK_TYPES,
} from "./TimelineBlock/TimelineBlock";
import { DAY } from "../../../utils/utils";

import "./Timeline.css";

const Timeline = ({ scheduledFlights }) => {
  const timelineBlocks = useMemo(() => {
    const validFlights = scheduledFlights.filter(
      ({ origin_valid, arrival_valid, departure_valid, destination_valid }) =>
        origin_valid && destination_valid && arrival_valid && departure_valid
    );

    const blocks = validFlights.reduce((allBlocks, currentFlight, index) => {
      const { departuretime, arrivaltime } = currentFlight;

      const flightLeft = (departuretime / DAY) * 100;
      const flightWidth = ((arrivaltime - departuretime) / DAY) * 100;

      const flightBlock = {
        blockType: TIMELINE_BLOCK_TYPES.FLIGHT,
        left: flightLeft,
        width: flightWidth,
        id: `flight-${currentFlight.id}`,
      };

      allBlocks.push(flightBlock);

      if (index !== validFlights.length - 1) {
        const nextFlight = validFlights[index + 1];
        const waitTime = nextFlight.departuretime - arrivaltime;
        const waitLeft = flightLeft + flightWidth;
        const waitWidth = (waitTime / DAY) * 100;
        const waitBlock = {
          blockType: TIMELINE_BLOCK_TYPES.WAIT,
          left: waitLeft,
          width: waitWidth,
          id: `wait-${currentFlight.id}-${nextFlight.id}`,
        };
        allBlocks.push(waitBlock);
      }

      return allBlocks;
    }, []);
    return blocks;
  }, [scheduledFlights]);

  return (
    <figure className='timeline__container'>
      <header className='timeline__labels'>
        <span className='timeline__label timeline__label__first'>00:00</span>
        <span className='timeline__label timeline__label__second'>12:00</span>
        <div className='timeline__label__marker timeline__label__marker__first' />
        <div className='timeline__label__marker timeline__label__marker__second' />
        <div className='timeline__label__marker timeline__label__marker__third' />
      </header>
      <section className='timeline__main'>
        {!!timelineBlocks &&
          timelineBlocks.map((block) => (
            <TimelineBlock
              key={block.id}
              left={block.left}
              width={block.width}
              blockType={block.blockType}
            />
          ))}
      </section>
    </figure>
  );
};

export default Timeline;
