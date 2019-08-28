import React from "react";
import Truncate from "react-truncate";
import "./style.css";

function Card({ onClick, children, price, image, id }) {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-5 mx-auto">
      <div className="text-center mb-3">
        <img
          className="img-fluid card-img"
          src={image}
          alt={children}
        />
      </div>
      <h6 className="card-title">
        <strong>
          <Truncate lines={1}>{children}</Truncate>
        </strong>
      </h6>
      <div className="d-flex justify-content-between">
        <span>${price}</span>
        <button
          data-variant-id={id}
          className="btn-sm btn-outline-success"
          onClick={() => onClick(id)}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default Card;
