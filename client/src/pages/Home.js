import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Service from "../components/Service";
import ForSale from "../components/ForSale";

class Home extends Component {
  state = {
  };

  render() {
    return (
      <>
        <Jumbotron>
          FLASH SALE OFF 70%
        </Jumbotron>
        <main>
          <Service />
          <ForSale>
            Top sale in this week
          </ForSale>
        </main>
      </>
    );
  }
}

export default Home;
