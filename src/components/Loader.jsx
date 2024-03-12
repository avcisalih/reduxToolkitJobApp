import React from "react";

const Loader = () => {
  return (
    <div className="wrapper">
      <div className="loader">
        <span className="loader-text">Yükleniyor</span>
        <span className="load"></span>
      </div>
    </div>
  );
};

export default Loader;
