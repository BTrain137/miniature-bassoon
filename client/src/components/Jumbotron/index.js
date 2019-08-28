import React from "react";
import "./style.css";

const Jumbotron = ({ children }) => {
  return (
    <div className="position-relative">
      <div className="jumbotron jumbotron-fluid" style={{ "backgroundImage": "url("+ process.env.PUBLIC_URL + "./assets/images/fleece_lined_winter_headband.jpg)"}}>
      </div>
      <div className="container jumbotron-body d-flex align-items-center justify-content-center flex-column">
        <h1 className="display-4 mb-4 text-center font-weight-bolder">{ children }</h1>
        <p className="lead text-center">
          <button className="tron-btn">Shop Now</button>  
        </p>
      </div>
    </div>
  );
};

export default Jumbotron;
