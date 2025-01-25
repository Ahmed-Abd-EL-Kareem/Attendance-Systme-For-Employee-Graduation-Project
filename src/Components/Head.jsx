import React from "react";

const Head = ({ title }) => {
  return (
    <>
      <div data-aos="zoom-in" data-aos-duration="1500" className="main-head">
        <h2>{title}</h2>
      </div>
    </>
  );
};

export default Head;
