import React, { Component } from "react";
import Card from "../Card";
import "./style.css";

import data from "./dummyData.json";

class ForSale extends Component {
  state = {
    cards: [],
  };

  componentDidMount() {
    const productCards = data.products.map(function(datam) {
      return {
        title: datam.title,
        handle: datam.handle,
        image: datam.image.src,
        price: datam.variants[0].price,
      };
    });

    this.setState({
      cards: productCards,
    });
  }

  render() {
    return (
      <section className="for-sale mt-4">
        <div className="text-center mb-3">
          <h3 className="title">TRENDING</h3>
          <div className="block-note">{ this.props.children }</div>
        </div>
        <div className="container mx-auto row">
          {this.state.cards.map(function(card, i){
            return  <Card 
                      key={i}
                      price={card.price}
                      image={card.image}
                      handle={card.handle}
                    >
                      { card.title }
                    </Card>
          })}
        </div>
      </section>
    );
  }
}

export default ForSale;
