import React, { Component } from "react";
import Client from "shopify-buy";
import Card from "../Card";
import "./style.css";

const shopifyAPI = Client.buildClient({
  domain: "fantasticheadbands.myshopify.com",
  storefrontAccessToken: "caf3407b04b77828c161e497b106ab42"
});

// import data from "./dummyData.json";

const all_product_url =
  "https://7io32bkt5j.execute-api.us-west-2.amazonaws.com/dev/shopify/all-products";

class ForSale extends Component {
  state = {
    cards: [],
    lineItems: [],
    cartId:
      "Z2lkOi8vc2hvcGlmeS9DaGVja291dC9iN2E3MmU1ZGE4NDk5ZTRkMzM0YmM2MDMxMjBlOWVjOD9rZXk9ZjI2YTMwYTRjMTlhOTAxMzAyYTBiYjZiZGJhNDdjNGE=",
  };

  componentDidMount() {
    shopifyAPI.product
      .fetchAll()
      .then(products => {
        console.log(products);

        const cards = products.map(({ variants, handle, images, title }) => {
          return {
            id: variants[0].id,
            handle,
            image: images[0].src,
            title
          };
        });

        this.setState({ cards });
      })
      .catch(err => {
        console.log(err);
      });
  }

  addToCart = id => {
    let lineItems = [...this.state.lineItems];
    lineItems.push({
      quantity: 1,
      variantId: id
    });

    this.setState({ lineItems });
  };

  // For Testing
  checkout = async () => {
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
  };

  // For testing
  fetchCheckout = () => {
    if (this.state.cartId) {
      shopifyAPI.checkout.fetch(this.state.cartId).then(checkout => {
        console.log(checkout);
      });
    }
  }

  render() {
    return (
      <section className="for-sale mt-4">
        <div className="text-center mb-3">
          <h3 className="title text-uppercase">Trending</h3>
          <div className="block-note">{this.props.children}</div>
        </div>
        <div className="container mx-auto row d-flex justify-content-center">
          {this.state.cards.length ? (
            this.state.cards.map((card, i) => {
              return (
                <Card
                  key={i}
                  price={card.price}
                  image={card.image}
                  handle={card.handle}
                  id={card.id}
                  onClick={this.addToCart}
                >
                  {card.title}
                </Card>
              );
            })
          ) : (
            <div className={"text-center mt-5"}>
              <div
                className="spinner-border"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>
        {/* Buttons For Testing */}
        <button className="btn btn-primary" onClick={this.checkout}>
          checkout
        </button>
        <button className="btn btn-success" onClick={this.fetchCheckout}>
          Fetch Checkout
        </button>
      </section>
    );
  }
}

export default ForSale;
