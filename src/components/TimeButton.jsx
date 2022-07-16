import React from "react";

const TimeButton = (props) => {
  return (
    <div className="m-3">
      <button className="btn-primary" onClick={props.onClick}>
        {props.name}
      </button>
    </div>
  );
};

export default TimeButton;
