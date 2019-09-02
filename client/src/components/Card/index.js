import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./style.css";

class Card extends Component {
  state = {
    variants: []
  };

  static getDerivedStateFromProps(props, state) {
    const { variants } = props;
    return { variants };
  }

  render() {
    return (
      <div className="col-lg-3 col-md-4 col-sm-6 mb-5 mx-auto">
        <span
          className="d-inline-block text-truncate"
          style={{ maxWidth: "248px" }}
        >
          {this.props.children}
        </span>
        <OwlCarousel className="owl-cards-wrapper" items={1} lazyLoad loop nav>
          {this.state.variants.length ? (
            this.state.variants.map(variant => {
              return (
                <div key={variant.id}>
                  <div className="text-center mb-3" style={{ height: "247px" }}>
                    <img
                      className="img-fluid card-img"
                      src={variant.image.src}
                      alt={variant.title}
                    />
                  </div>
                  <h6 className="card-title">
                    <strong>
                      <span
                        className="d-inline-block text-truncate"
                        style={{ maxWidth: "248px" }}
                      >
                        {variant.title !== "Default Title" &&
                        variant.title.length > 2
                          ? variant.title
                          : ""}
                      </span>
                    </strong>
                  </h6>
                  <div className="d-flex justify-content-between">
                    <span>${variant.price}</span>
                    <button
                      data-variant-id={variant.id}
                      className="btn-sm btn-outline-success"
                      onClick={() =>
                        this.props.addToCart({
                          variant_id: variant.id,
                          image: variant.image.src,
                          title: this.props.children,
                          price: variant.price,
                          quantity: 1
                        })
                      }
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
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
        </OwlCarousel>
      </div>
    );
  }
}

export default Card;
