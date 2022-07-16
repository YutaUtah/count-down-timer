import React from "react";

const TimeElem = (props) => {
  function defaultMax(name) {
    if (name === "hours") {
      return 24;
    } else {
      return 60;
    }
  }

  return (
    <div className="timer-element">
      <input
        className="input-element"
        type="number"
        name={props.name}
        onChange={props.onChange}
        min="0"
        max={defaultMax(props.name)}
      />
      <div className="m-2">{props.name}</div>
    </div>
  );
};

export default TimeElem;
