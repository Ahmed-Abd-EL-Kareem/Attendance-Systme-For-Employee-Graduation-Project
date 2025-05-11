import React from "react";

const DashCard = ({ text, count, icon, color }) => {
  return (
    <>
      <div
        data-aos="flip-left"
        data-aos-duration="1500"
        className="card d-flex flex-row align-items-stretch justify-content-between p-3"
        style={{ borderLeft: `4px solid ${color}` }}
      >
        <h3>{text}</h3>
        <p className="num">
          <sub>{count}</sub>
          {icon}
        </p>
      </div>
    </>
  );
};

export default DashCard;
