import React, { Component } from "react";
import { Container } from "react-bootstrap";
import data from "./cartDummyData.json";
import "./style-cart.css";

class Saved extends Component {
  state = {
    cart: [],
    cartItems: [],
    orderNotes: "",
    subTotal: 0,
  };

  componentDidMount() {
    const cartItems = data.items.map((item, index) => {
      return {
        id: index,
        price: (item.price / 100).toFixed(2),
        quantity: item.quantity,
        title: item.product_title,
        image: item.image,
        handle: item.handle,
        variant_id: item.variant_id,
        key: item.key
      };
    });

    this.setState({ cartItems: cartItems });
    this.subTotal(cartItems);
  }

  trashCan = id => {
    const cartItems = this.state.cartItems.filter(item => item.id !== id);
    console.log(cartItems);
    this.setState({ cartItems });
  };

  upDateQuantity = (id, math) => {
    const cart = this.state.cartItems.filter(item => {
      if (item.id === id) {
        item.quantity += parseInt(math);
      }
      if (item.quantity > 0) {
        return item;
      }
    });
    this.subTotal(cart);
  };

  removeAll = () => this.setState({ cart: [] });

  subTotal = cart => {
    console.log(cart);
    const subTotal = cart.reduce((acc, item) => {
      return parseInt(item.quantity) * parseInt(item.price) + acc;
    }, 0);
    this.setState({ subTotal, cart });
  };

  onChange = e => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Container>
        <h1 className="theme-text-color display-4 text-center my-3">
          Your Cart
        </h1>

        {this.state.cartItems.map(item => {
          return (
            <div className="row cart-row" key={item.key}>
              <div className="offset-1 col-2 d-none d-md-block">
                <img className="img-fluid" src={item.image} alt={item.title} style={{ minWidth: "145px" }}/>
              </div>
              <div className="col-12 col-md-9">
                <div className="row mb-5">
                  <div className="offset-1 col-10">
                    <span className="theme-text-color-sec d-inline-block text-truncate" style={{ maxWidth: "90%" }}>
                      {item.title}
                    </span>
                      <div className="cursor-pointer" onClick={() => this.trashCan(item.id)}>🗑</div>
                  </div>
                </div>
                <div className="row d-flex justify-content-around">
                  <div>
                    Price <br /> <br />${item.price}
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
                        onClick={() => this.upDateQuantity(item.id, "-1")}
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
                        value={item.quantity}
                        min="1"
                        data-id={item.key}
                        aria-label="quantity"
                        pattern="[0-9]*"
                        name={"updates_" + item.id}
                        id={"updates_" + item.id}
                        // onChange={(e)=> this.onChange(e)}
                        readOnly
                      />
                      <span
                        className="adjust-qty p-2"
                        onClick={() => this.upDateQuantity(item.id, "1")}
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
                    Total <br /> <br /> ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
            <button className="btn btn-danger" onClick={this.removeAll}>REMOVE ALL</button>
          </div>
          <div className="col-2">
            <button className="btn btn-success">Checkout</button>
          </div>
        </div>
      </Container>
    );
  }
}

export default Saved;
