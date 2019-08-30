import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Client from "shopify-buy";
import "./style.css";

const shopifyAPI = Client.buildClient({
  domain: "fantasticheadbands.myshopify.com",
  storefrontAccessToken: "caf3407b04b77828c161e497b106ab42"
});

class Nav extends Component {
  state = {
    open: false,
    width: window.innerWidth,
    goToCart: false,
    lineItems: [],
    cartId:
      "Z2lkOi8vc2hvcGlmeS9DaGVja291dC9iN2E3MmU1ZGE4NDk5ZTRkMzM0YmM2MDMxMjBlOWVjOD9rZXk9ZjI2YTMwYTRjMTlhOTAxMzAyYTBiYjZiZGJhNDdjNGE="
  };

  updateWidth = () => {
    const newState = { width: window.innerWidth };

    if (this.state.open && newState.width > 991) {
      newState.open = false;
    }

    this.setState(newState);
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  addItemsToCart = async () => {
    if (this.state.lineItems.length > 0) {
      if (!this.state.cartId) {
        const cartId = await shopifyAPI.checkout.create().then(checkout => {
          return checkout.id;
        });

        console.log("cartId", cartId);
        this.setState({ cartId });
      }

      const lineItemsAdd = await shopifyAPI.checkout
        .addLineItems(this.state.cartId, this.state.lineItems)
        .then(checkout => {
          return checkout.lineItems;
        });

      console.log("checkout.lineItems", lineItemsAdd);
    }

    this.setState({ goToCart: true });
  };

  render() {
    if (this.state.goToCart === true) {
      return <Redirect to="/cart" />;
    }

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
                    <div onClick={this.addItemsToCart}>
                      <i className="pe-7s-cart nav-cart-icon" />
                      {this.state.lineItems.length ? (
                        <span className="nav-cart-item-number">
                          {this.state.lineItems.length}
                        </span>
                      ) : (
                        <span className="nav-cart-item-none">0</span>
                      )}
                    </div>
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
