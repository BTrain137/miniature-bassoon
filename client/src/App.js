import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './components/reducers';
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import "./style.css";

function App() {
  return (
    <Provider store={createStore(reducers, { products: [] })}>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cart" component={Cart} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
