import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

class Nav extends Component {
  state = {
    open: false,
    width: window.innerWidth
  };

  updateWidth = () => {
    const newState = { width: window.innerWidth };

    if (this.state.open && newState.width > 991) {
      newState.open = false;
    }

    this.setState(newState);
  };

  toggleNav = () => {
    this.setState({ open: !this.state.open });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
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
                  src={process.env.PUBLIC_URL + "fantasticHeadBandsLogo.png"}
                  alt="Logo"
                />
              </Link>
              <div className="" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      onClick={this.toggleNav}
                      className={
                        window.location.pathname === "/cart"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/cart"
                    >
                      Cart
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

export default Nav;
