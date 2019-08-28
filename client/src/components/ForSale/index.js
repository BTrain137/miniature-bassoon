import React, { Component } from "react";
import Card from "../Card";
import "./style.css";

// import data from "./dummyData.json";

const all_product_url =
  "https://7io32bkt5j.execute-api.us-west-2.amazonaws.com/dev/shopify/all-products";

class ForSale extends Component {
  state = {
    cards: [],
    display: ""
  };

  componentDidMount() {
    fetch(all_product_url)
      .then(items => items.json())
      .then(items => {
        const cards = items.map(({ title, handle, image, variants }) => ({
          title,
          handle,
          image: image.src,
          price: variants[0].price
        }));

        this.setState({ cards, display: "d-none" });
      });
  }

  render() {
    return (
      <section className="for-sale mt-4">
        <div className="text-center mb-3">
          <h3 className="title">TRENDING</h3>
          <div className="block-note">{this.props.children}</div>
        </div>
        <div className={"text-center mt-5 " + this.state.display }>
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div className="container mx-auto row">
          {this.state.cards.map(function(card, i) {
            return (
              <Card
                key={i}
                price={card.price}
                image={card.image}
                handle={card.handle}
              >
                {card.title}
              </Card>
            );
          })}
        </div>
      </section>
    );
  }
}

export default ForSale;
