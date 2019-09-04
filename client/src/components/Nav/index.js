import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { cartCount } from '../actions';
import "./style.css";

import lineItems from "../../pages/cartDummyData.json";

class Nav extends Component {
  state = {
    lineItems: [],
    cartId: ""
  };

  // componentDidMount() {
  //   this.updateCartQuantity();
  // }

  updateCartQuantity() {
    // let cartNumQuantity = lineItems.reduce((total, { quantity }) => {
    //   return parseInt(total) + parseInt(quantity);
    // }, 0);

    // this.setState({ cartNumQuantity });
    // this.props.cartCount({cartCount})
  }

  render() {
    return (
      <div>
        <div className="row fixed-top theme-background-color">
          <div className="offset-2 col-8">
            <nav className="navbar navbar-expand-lg navbar-light bg-light w-100 d-flex justify-content-between">
              <Link className="navbar-brand" to="/">
                <img
                  className="navbar-logo"
                  src={process.env.PUBLIC_URL + "./fantasticHeadBandsLogo.png"}
                  alt="Logo"
                />
              </Link>
              <div className="" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/cart">
                      <i className="pe-7s-cart nav-cart-icon" />
                      {this.props.cartCount ? (
                        <span className="nav-cart-item-number">
                          {this.props.cartCount}
                        </span>
                      ) : (
                          <span className="nav-cart-item-none">0</span>
                        )}
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <div style={{ height: "86px" }} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartCount: state.cartCount
  }
}

export default connect(mapStateToProps)(Nav);
