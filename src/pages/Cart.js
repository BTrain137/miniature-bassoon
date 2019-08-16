import React, { Component } from "react";
import API from "../utils/API";
import { Table, Container } from 'react-bootstrap';


class Saved extends Component {
  state = {
    cart: [
      {
        id: 1,
        image: 'https://via.placeholder.com/150',
        product: 'Red Head Band',
        price: '25',
        quantity: 1,
      },
      {
        id: 2,
        image: 'https://via.placeholder.com/150',
        product: 'Blue Head Band',
        price: '20',
        quantity: 1,
      },
      {
        id: 3,
        image: 'https://via.placeholder.com/150',
        product: 'Black Head Band',
        price: '30',
        quantity: 3,
      },
      {
        id: 4,
        image: 'https://via.placeholder.com/150',
        product: 'Green Head Band',
        price: '15',
        quantity: 2,
      }
    ],
    orderNotes: '',
    subTotal: 0,
    po: ''
  };

  componentDidMount() {
    this.subTotal([
      {
        id: 1,
        image: 'https://via.placeholder.com/150',
        product: 'Red Head Band',
        price: '25',
        quantity: 1,
      },
      {
        id: 2,
        image: 'https://via.placeholder.com/150',
        product: 'Blue Head Band',
        price: '20',
        quantity: 1,
      },
      {
        id: 3,
        image: 'https://via.placeholder.com/150',
        product: 'Black Head Band',
        price: '30',
        quantity: 3,
      },
      {
        id: 4,
        image: 'https://via.placeholder.com/150',
        product: 'Green Head Band',
        price: '15',
        quantity: 2,
      }
    ]);
  }

  getSavedBooks = () => {
    API.getSavedBooks()
      .then(res =>
        this.setState({
          books: res.data
        })
      )
      .catch(err => console.log(err));
  };

  handleBookDelete = id => {
    API.deleteBook(id).then(res => this.getSavedBooks());
  };

  trashCan = id => {
    console.log(id)
    const cart = this.state.cart.filter(item => item.id !== id)
    this.setState({ cart })
  }

  upDateQuantity = (id, math) => {
    console.log(id, math);
    const cart = this.state.cart.filter(item => {
      if (item.id === id) {
        item.quantity += parseInt(math)
      }
      if (item.quantity > 0) {
        return item;
      }
    })
    this.subTotal(cart)
  }

  removeAll = () => this.setState({ cart: [] })

  subTotal = (cart) => {
    const subTotal = cart.reduce((acc, item) => (parseInt(item.quantity) * parseInt(item.price)) + acc, 0)
    this.setState({ subTotal, cart })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {this.state.cart.map((item) => (

              <tr>
                <td></td>
                <td><img src={item.image} /></td>
                <td>{item.product} <div onClick={() => this.trashCan(item.id)}>🗑</div></td>
                <td >
                  <span >
                    <span style={{ border: '1px solid black', padding: '5px' }}
                      onClick={() => this.upDateQuantity(item.id, '-1')}>
                      -
                      </span>

                   <span style={{margin:'5px'}}>{item.quantity}</span> 

                    <span style={{ border: '1px solid black', padding: '5px' }}
                      onClick={() => this.upDateQuantity(item.id, '1')}>
                      +
                  </span>
                  </span>
                </td>
                <td>${item.quantity * item.price}</td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td>Order Notes: <div><textarea name='orderNotes' value={this.state.orderNotes} onChange={this.onChange}></textarea></div></td>
              <td></td>
              <td></td>
              <td>Subtotal: {this.state.subTotal}</td>
            </tr>
            <tr>
              <td></td>
              <td>Enter Your PO Here: <div><textarea name='po' value={this.state.po} onChange={this.onChange}></textarea></div></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td><button onClick={this.removeAll}>REMOVE ALL</button></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>


          </tbody>
        </Table>

      </Container>
    );
  }
}

export default Saved;
