import React from "react";
import Truncate from 'react-truncate';
import "./style.css";

function Card({ children, price, image }) {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-5 mx-auto">
      <div className="text-center mb-3">
        <img className="img-fluid card-img" src={image} alt={children} />
      </div>
        <h6 className="card-title">
          <strong>
            <Truncate lines={1}>
              {children}
            </Truncate>
          </strong>
        </h6>
        <span>${price}</span>
    </div>
  );
}

export default Card;
