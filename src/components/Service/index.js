import React from "react";
import "./style.css";

const Service = () => {
  return (
    <section className="pt-5 pb-1">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 mb-3">
            <div className="row">
              <div className="col-md-12">
                <div className="icon-service">
                  <div className="icon">
                    <i className="pe-7s-car">&nbsp;</i>
                  </div>
                  <div className="d-table-cell">
                    <h6 className="mb-1 font-weight-bolder">FREE SHIPPING</h6>
                    <p className="text-color-theme">
                      Free shipping on all US order or order above $200
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 mb-3">
            <div className="row">
              <div className="col-md-12">
                <div className="icon-service">
                  <div className="icon">
                    <i className="pe-7s-help2">&nbsp;</i>
                  </div>
                  <div className="d-table-cell">
                    <h6 className="mb-1 font-weight-bolder">SUPPORT 24/7</h6>
                    <p className="text-color-theme">
                      Contact us 24 hours a day, 7 days a week
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 mb-3">
            <div className="row">
              <div className="col-md-12">
                <div className="icon-service">
                  <div className="icon">
                    <i className="pe-7s-refresh">&nbsp;</i>
                  </div>
                  <div className="d-table-cell">
                    <h6 className="mb-1 font-weight-bolder">30 DAYS RETURN</h6>
                    <p className="text-color-theme">
                      Simply return it within 30 days for an exchange.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 mb-3">
            <div className="row">
              <div className="col-md-12">
                <div className="icon-service">
                  <div className="icon">
                    <i className="pe-7s-door-lock">&nbsp;</i>
                  </div>
                  <div className="d-table-cell">
                    <h6 className="mb-1 font-weight-bolder">
                      100% PAYMENT SECURE
                    </h6>
                    <p className="text-color-theme">
                      We ensure secure payment with PEV
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
