import React from "react";
import "./style.css";

function Footer() {
  return (
    <footer className="theme-background-color">
      <hr />
      <div className="container">
        <div className="row mt-4">
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <div className="text-center">
              <img
                className="navbar-logo"
                src={process.env.PUBLIC_URL + "fantasticHeadBandsLogo.png"}
                alt="Logo"
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <ul className="list-icon">
              <li>
                <span className="icon pe-7s-map-marker">&nbsp;</span>
                184 Main Rd E, St Albans <br />
                VIC 3021, Australia
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <ul className="list-icon">
              <li>
                <span className="icon pe-7s-mail">&nbsp;</span>
                <a href="mailto:contact@company.com">contact@company.com</a>
              </li>
              <li>
                <span className="icon pe-7s-call">&nbsp;</span>{" "}
                <a href="tel:+0012233456">+001 2233 456</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <p>
              Subscribe to our newsletter and get 10% off your first purchase
            </p>
            <div>
              <div className="block newsletter">
                <div className="content">
                  <form
                    className="form subscribe"
                    action="http://themes.magesolution.com/claue/m2/newsletter/subscriber/new/"
                    method="post"
                    id="newsletter-validate-detail-footer"
                  >
                    <div className="field form-group newsletter">
                      <div className="control">
                        <input
                          name="email"
                          type="email"
                          id="newsletter-footer"
                          placeholder="Your email address"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <p className="mt-5">
              <span className="footer-payment-img" style={{ "backgroundImage": "url("+ process.env.PUBLIC_URL + "./assets/images/sprites_flag.jpg)"}}>&nbsp;</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
