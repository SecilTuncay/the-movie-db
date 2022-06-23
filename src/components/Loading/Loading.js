import React from "react";

const Loading = () => {
  return (
    <div className="container">
      <div className="row loading-row justify-content-center align-items-center">
        <div className="loading">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
