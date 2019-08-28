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
    books: [],
    q: "",
    message: "Search For A Book To Begin!"
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  getBooks = () => {
    API.getBooks(this.state.q)
      .then(res =>
        this.setState({
          books: res.data
        })
      )
      .catch(() =>
        this.setState({
          books: [],
          message: "No New Books Found, Try a Different Query"
        })
      );
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.getBooks();
  };

  handleBookSave = id => {
    const book = this.state.books.find(book => book.id === id);

    API.saveBook({
      googleId: book.id,
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail
    }).then(() => this.getBooks());
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
