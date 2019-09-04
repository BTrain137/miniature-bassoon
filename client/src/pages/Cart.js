import React, { Component } from "react";
import { connect } from 'react-redux';
import { updateLineItems } from '../components/actions';
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Client from "shopify-buy";
import "./style-cart.css";

import lineItems from "./cartDummyData.json";

const shopifyAPI = Client.buildClient({
  domain: "fantasticheadbands.myshopify.com",
  storefrontAccessToken: "caf3407b04b77828c161e497b106ab42"
});

class Cart extends Component {
  state = {
    orderNotes: "",
    subTotal: 0,
    webUrl: "",
    cartId: ""
  };

  componentDidMount() {
    const variantIds = {};
    this.props.lineItems.forEach(cartItem => {
      variantIds["updates_" + cartItem.variant_id] = cartItem.quantity;
    });
    // this.setState({ lineItems, ...variantIds });

    this.subTotal(lineItems);
  }

  goToShopifyCheckout = async () => {

    // console.log('Hi from goToShopifyCheckout')
    // if (this.state.cartId) {
    //   const webUrl = await shopifyAPI.checkout
    //     .fetch(this.state.cartId)
    //     .then(checkout => {
    //       console.log(checkout.webUrl)
    //       return checkout.webUrl;
    //     });

    //   this.setState({ webUrl });
    //   window.location.replace(this.state.webUrl);
    // }

    shopifyAPI.checkout.create()
      .then(checkout => {

        const cartItems = this.props.lineItems.map(({ variant_id, quantity }) => {
          return {
            variantId: variant_id,
            quantity
          }
        })
        shopifyAPI.checkout.addLineItems(checkout.id, cartItems).then((checkout) => {
          // Do something with the updated checkout
          //   console.log(checkout.lineItems); // Array with one additional line item
          window.location.replace(checkout.webUrl);
          // });
        })
      })

  }

  trashCan = variantId => {
    const lineItems = this.state.lineItems.filter(
      item => item.variant_id !== variantId
    );
    this.setState({ lineItems });
    this.subTotal(lineItems);
  };

  upDateQuantity = (variantId, math) => {
    const cart = this.props.lineItems.filter(item => {
      if (item.variant_id === variantId) {
        if (item.quantity > 0) {
          item.quantity += parseInt(math);
        }
        else if (math === "1" && item.quantity === 0) {
          item.quantity += 1;
        }

        // this.setState({ ["updates_" + variantId]: item.quantity });
      }
      return item;
    });
    this.subTotal(cart);
  };

  removeAll = () => this.setState({ lineItems: [], subTotal: 0 });

  subTotal = cart => {
    const subTotal = cart.reduce((acc, item) => {
      return +item.quantity * parseFloat(item.price) + acc;
    }, 0);
    this.setState({ subTotal });
  };

  onChange = e => {
    const re = /^[0-9\b]+$/;
    const variantId = e.target.getAttribute("data-id");
    const inputValue = e.target.value;

    if ((inputValue === "" || re.test(inputValue)) && inputValue < 100) {
      const lineItems = this.props.lineItems.map(item => {
        if (item.variant_id === variantId) {
          item.quantity = +inputValue;
        }
        return item;
      });
      // this.setState({ lineItems, [e.target.name]: +inputValue });
      this.props.updateLineItems([...lineItems]);
      this.subTotal(lineItems);
    }
  };

  render() {
    return (
      <Container>
        <h1 className="theme-text-color-sec display-4 text-center my-3">
          Your Cart
        </h1>

        {this.props.lineItems.length ? (
          this.props.lineItems.map(lineItem => {
            return (
              <div className="row cart-row" key={lineItem.variant_id}>
                <div className="offset-1 col-2 d-none d-md-block">
                  <img
                    className="img-fluid"
                    src={lineItem.image}
                    alt={lineItem.title}
                    style={{ minWidth: "145px" }}
                  />
                </div>
                <div className="col-12 col-md-9">
                  <div className="row mb-5">
                    <div className="offset-1 col-10">
                      <span
                        className="theme-text-color-sec d-inline-block text-truncate"
                        style={{ maxWidth: "90%" }}
                      >
                        {lineItem.title}
                      </span>
                      <div
                        className="cursor-pointer"
                        onClick={() => this.trashCan(lineItem.variant_id)}
                      >
                        🗑
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-around">
                    <div>
                      Price <br /> <br />${lineItem.price}
                    </div>
                    <div className="text-center">
                      <label
                        htmlFor="updates_{item.id}"
                        className="cart__mini-labels"
                      >
                        QTY
                      </label>
                      <div className="js-qty d-flex">
                        <span
                          className="adjust-qty p-2"
                          onClick={() =>
                            this.upDateQuantity(lineItem.variant_id, "-1")
                          }
                        >
                          <span className="minus" aria-hidden="true">
                            -
                          </span>
                          <span className="visuallyhidden">
                            Reduce item quantity by one
                          </span>
                        </span>
                        <input
                          type="text"
                          className="js--num"
                          value={lineItem.quantity}
                          min="1"
                          data-id={lineItem.variant_id}
                          aria-label="quantity"
                          pattern="[0-9]*"
                          name={"updates_" + lineItem.variant_id}
                          id={"updates_" + lineItem.variant_id}
                          onChange={this.onChange}
                        />
                        <span
                          className="adjust-qty p-2"
                          onClick={() =>
                            this.upDateQuantity(lineItem.variant_id, "1")
                          }
                        >
                          <span className="add" aria-hidden="true">
                            +
                          </span>
                          <span className="visuallyhidden">
                            Increase item quantity by one
                          </span>
                        </span>
                      </div>
                    </div>
                    <div>
                      Total <br /> <br /> $
                      {(lineItem.price * lineItem.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
            <div
              style={{ height: "30vh", minHeight: "300px" }}
              className="d-flex align-items-center justify-content-center flex-column"
            >
              <h2 className="text-center">Empty Cart</h2>
              <Link to="/">
                <button
                  style={{ backgroundColor: "#A4664D", border: "none" }}
                  className="btn btn-primary btn-border-radius mt-4"
                >
                  Continue Shopping
              </button>
              </Link>
            </div>
          )}
        <div className="row cart-row d-flex justify-content-between">
          <div className="offset-1 col-4">
            Order Notes:
            <div>
              <textarea
                name="orderNotes"
                value={this.state.orderNotes}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="col-2">
            Subtotal: ${this.state.subTotal.toFixed(2)}
          </div>
        </div>
        <div className="row d-flex justify-content-between">
          <div className="offset-1 col-2">
            <button className="btn" onClick={this.removeAll}>
              REMOVE ALL
            </button>
          </div>
          <div className="col-2">
            <button
              className="btn btn-border-radius theme-background-color-sec text-white"
              onClick={this.goToShopifyCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </Container>
    );
  }
}


const mapStateToProps = state => {
  return {
    lineItems: state.lineItems,
  }
}

export default connect(mapStateToProps, { updateLineItems })(Cart);