import React, { Component } from "react";
import { connect } from 'react-redux';
import { getProducts, updateLineItems } from '../actions';
import Client from "shopify-buy";
import Card from "../Card";
import "./style.css";

const shopifyAPI = Client.buildClient({
  domain: "fantasticheadbands.myshopify.com",
  storefrontAccessToken: "caf3407b04b77828c161e497b106ab42"
});

// const all_product_url =
// "https://7io32bkt5j.execute-api.us-west-2.amazonaws.com/dev/shopify/all-products";

class ForSale extends Component {
  state = {
    cartId: ""
  };

  componentDidMount() {
    this._isMounted = true;
    shopifyAPI.product
      .fetchAll()
      .then(products => {
        const reducedProducts = products.map(({ variants, title }) => {
          return {
            title,
            variants
          };
        });

        if (this._isMounted) {
          this.props.getProducts(reducedProducts)
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  addToCart = variant => {
    let isItemExist = false;

    const lineItemsCopy = this.props.lineItems.map(lineItem => {
      if (lineItem.variant_id === variant.variant_id) {
        lineItem.quantity += 1;
        isItemExist = true
      }
      return lineItem;
    });

    if (!isItemExist) {
      lineItemsCopy.push(variant);
    }


    this.props.updateLineItems(lineItemsCopy)


  };

  render() {

    return (
      <section className="for-sale mt-4">
        <div className="text-center mb-3">
          <h3 className="title text-uppercase">Trending</h3>
          <div className="block-note">{this.props.children}</div>
        </div>
        <div className="container mx-auto row d-flex justify-content-center">
          {this.props.products.length ? (
            this.props.products.map((card, i) => {
              return (
                <Card
                  key={i}
                  variants={card.variants}
                  addToCart={this.addToCart}
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
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    lineItems: state.lineItems,
  }
}

export default connect(mapStateToProps, { getProducts, updateLineItems })(ForSale);

