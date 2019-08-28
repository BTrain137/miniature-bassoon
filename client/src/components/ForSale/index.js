import React, { Component } from "react";
import Card from "../Card";
import "./style.css";

import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: 'fantasticheadbands.myshopify.com',
  storefrontAccessToken: 'caf3407b04b77828c161e497b106ab42'
});





// import data from "./dummyData.json";

const all_product_url = "https://7io32bkt5j.execute-api.us-west-2.amazonaws.com/dev/shopify/all-products";

class ForSale extends Component {
  state = {
    cards: [],
    display: "",
    isCart: false,
    cartId: false,
    lineItems: []
  };

  componentDidMount() {

    client.product.fetchAll()
      .then((products) => {
        // Do something with the products
        console.log(products)

        const cards = products.map(({ variants, handle, images, title }) => {
          return {
            id: variants[0].id,
            handle,
            image: images[0].src,
            title
          }
        })

        this.setState({ cards, display: 'd-none' })
      })
      .catch((err) => {
        console.log(err)
      });

  }


  addToCart = (id) => {
    console.log(id)

    let lineItems = [...this.state.lineItems]
    lineItems.push({ quantity: 1, variantId: id, customAttributes: [{ key: "MyKey", value: "MyValue" }] });

    this.setState({ lineItems })

  }


  checkout = () => {

    console.log('Is This Working!!!')

    if (this.state.lineItems.length > 0) {

      client.checkout.create().then((checkout) => {
        // Do something with the checkout
        console.log(checkout);

        return checkout.id;

      })
        .then(checkoutId => {

          console.log(`Checkout id: ${checkoutId}`)

          client.checkout.addLineItems(checkoutId, this.state.lineItems).then((checkout) => {
            // Do something with the updated checkout
            console.log(checkout.lineItems); // Array with one additional line item

            client.checkout.fetch(checkoutId).then((checkout) => {
              // Do something with the checkout
              console.log(checkout);
            });
          });
        })
    }

  }

  render() {
    return (
      <section className="for-sale mt-4">
        <div className="text-center mb-3">
          <h3 className="title">TRENDING</h3>
          <div className="block-note">{this.props.children}</div>
        </div>
        <div className={"text-center mt-5 " + this.state.display}>
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <div className="container mx-auto row">
          {this.state.cards.map((card, i) => {
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
          })}

          <button onClick={this.checkout}>CheckOut</button>
        </div>
      </section>
    );
  }
}

export default ForSale;
