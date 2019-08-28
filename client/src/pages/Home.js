import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
// import Card from "../components/Card";
// import Form from "../components/Form";
// import Book from "../components/Book";
// import { Col, Row, Container } from "../components/Grid";
// import { List } from "../components/List";
import API from "../utils/API";
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
