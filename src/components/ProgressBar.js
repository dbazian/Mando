import React from "react";
import "../scss/App.css";

const ProgressBar = (props) => {
  return (
    <div className="outer-div">
      <div className="inner-div" style={{ width: `${props.percentage}%` }} percentage={props.percentage} />
    </div>
  );
};

export default ProgressBar;
