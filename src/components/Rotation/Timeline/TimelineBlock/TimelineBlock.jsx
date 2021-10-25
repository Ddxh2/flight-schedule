import React from "react";

import "./TimelineBlock.css";

export const TIMELINE_BLOCK_TYPES = { FLIGHT: "FLIGHT", WAIT: "WAIT" };

const TimelineBlock = ({ blockType, left, width }) => {
  return (
    <div
      className={`timelineBlock__container ${
        blockType === TIMELINE_BLOCK_TYPES.FLIGHT
          ? "timelineBlock__container__flight"
          : blockType === TIMELINE_BLOCK_TYPES.WAIT
          ? "timelineBlock__container__wait"
          : ""
      }`}
      style={{ left: `${left}%`, width: `${width}%` }}
    ></div>
  );
};

export default TimelineBlock;
