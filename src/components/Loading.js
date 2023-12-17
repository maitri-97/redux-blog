import React from "react";

const Loading = () => {
  return (
    <div className="position-fixed top-0 start-0 h-100 w-100 d-flex align-items-center justify-content-center z-3 bg-white bg-opacity-75">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          margin: "auto",
          display: "block",
        }}
        width="40px"
        height="40px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="rgb(33,37,41)"
          strokeWidth="10"
          r="35"
          strokeDasharray="164.93361431346415 56.97787143782138"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  );
};

export default Loading;
