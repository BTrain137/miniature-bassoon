import React from "react";
import "./style.css";

function Footer() {
  return (
    <footer className="theme-background-color">
      <hr />
      <div className="container">
        <div className="row mt-4">
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <div class="text-center">
              <img
                className="navbar-logo"
                src={process.env.PUBLIC_URL + "fantasticHeadBandsLogo.png"}
                alt="Logo"
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <ul class="list-icon">
              <li>
                <span class="icon pe-7s-map-marker">&nbsp;</span>
                184 Main Rd E, St Albans <br />
                VIC 3021, Australia
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-2 col-sm-6 col-xs-12">
            <ul class="list-icon">
              <li>
                <span class="icon pe-7s-mail">&nbsp;</span>
                <a href="mailto:contact@company.com">contact@company.com</a>
              </li>
              <li>
                <span class="icon pe-7s-call">&nbsp;</span>{" "}
                <a href="tel:+0012233456">+001 2233 456</a>
              </li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <p>
              Subscribe to our newsletter and get 10% off your first purchase
            </p>
            <div>
              <div class="block newsletter">
                <div class="content">
                  <form
                    class="form subscribe"
                    novalidate="novalidate"
                    action="http://themes.magesolution.com/claue/m2/newsletter/subscriber/new/"
                    method="post"
                    id="newsletter-validate-detail-footer"
                  >
                    <div class="field form-group newsletter">
                      <div class="control">
                        <input
                          name="email"
                          type="email"
                          id="newsletter-footer"
                          placeholder="Your email address"
                        />
                      </div>
                    </div>
                    <div class="actions">
                      <button
                        class="action subscribe btn btn-primary btn-sm"
                        title="Subscribe"
                        type="submit"
                      >
                        <span>Subscribe</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <p class="margin-top25">
              <span class="footer-payment-img">&nbsp;</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
