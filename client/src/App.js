import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Auth from "./hoc/auth";
// pages for this product

import "./App.css";
import Navi from "./Components/Navi.js";
import Footer from "./Components/Footer.js";
import Header from "./Components/Header.js";
import Productpage from "./Components/Productpage.js";
import Item from "./Components/Item.js";
import Admin from "./Components/Admin.js";
import Women from "./Components/Women.js";
import Men from "./Components/Men.js";
import Bride from "./Components/Bride.js";
import Discount from "./Components/Discount.js";
import About from "./Components/About.js";
import CategoriesMain from "./Components/CategoriesMain.js";
import MoreItems from "./Components/MoreItems.js";
import Cart from "./Components/Cart.js";
import Cookies from "js-cookie";

class App extends Component {
  state = { cart: [{ id: "", name: "", prize: 0, imgSrc: [] }], cart: [] };

  addItemToCart = item => {
    console.log(item);
    Cookies.set("shoppingCartVellutoGiorno", [...this.state.cart, item], {
      expires: 1
    });
    this.setState({
      cart: [...this.state.cart, item]
    });
    console.log({ item });
  };
  clearCart = item => {
    console.log(item);
    Cookies.set("shoppingCartVellutoGiorno", [], {
      expires: 1
    });
    this.setState({
      cart: []
    });
  };

  cookiesDeleteItem = index => {
    const { cart } = this.state;
    cart.splice(index, 1);
    console.log(index, cart);
    Cookies.set("shoppingCartVellutoGiorno", cart, {
      expires: 1
    });
    this.setState({
      cart
    });
    window.location.reload();
  };

  handleDelete = index => {
    const { cart } = this.state;
    cart.splice(index, 1);
    console.log(index, cart);
    Cookies.set("shoppingCartVellutoGiorno", cart, {
      expires: 1
    });
    this.setState({
      cart
    });
  };

  handleScroll = () => {
    if (document.querySelector("header")) {
      const nav = document.querySelector("nav");
      nav.style.position = " fixed";
      nav.style.background = " rgba(0, 0, 0, 0.0)";
      window.addEventListener("scroll", e => {
        const nav = document.querySelector("nav");
        const menu = document.querySelector("header");
        if (window.pageYOffset + 500 > document.documentElement.clientHeight) {
          nav.style.background = " rgba(0, 0, 0, 0.7)";
        } else nav.style.background = " rgba(255, 255, 255, 0.0)";
      });
    }
  };
  componentDidMount() {
    // this.handleScroll();
    if (Cookies.get("shoppingCartVellutoGiorno")) {
      const cookiesLog = JSON.parse(Cookies.get("shoppingCartVellutoGiorno"));
      this.setState({
        cart: cookiesLog
      });
    }
  }
  render() {
    const { cart } = this.state;
    let sum = 0;
    const cartList = cart.map((item, index) => {
      if (item.id !== "") {
        sum += item.prize;
        return (
          <>
            <div className="singleCartItem">
              <div className="singleCartItem__img">
                <a href={`/product/${item.id}`}>
                  <img src={item.imgSrc[0]} alt="" />
                </a>
              </div>
              <div className="singleCartItem__info">
                <div className="singleCartItem__infoSingle">
                  <a href={`/product/${item.id}`}>{item.name}</a>
                </div>
                <div className="singleCartItem__infoSingle">
                  Rozmiar {item.size}
                </div>
                <div className="singleCartItem__infoSingle">
                  Cena {item.prize}
                </div>
              </div>
            </div>
          </>
        );
      }
    });

    return (
      <>
        <Router>
          <div className="wrapper">
            <div style={{ height: "6vh" }}></div>
            <Navi />

            <div className="cartCounter">
              <i
                class="fas fa-shopping-bag fa-color"
                onClick={e => {
                  const shoppingCart = document.querySelector(".cart");
                  if (shoppingCart) shoppingCart.classList.add("cartOpen");
                }}
              >
                <span className="cartCounter__counter">
                  {this.state.cart.length}
                </span>
              </i>
            </div>
            <div className="cart">
              <span
                className="close"
                onClick={e => {
                  const shoppingCart = document.querySelector(".cart");
                  if (shoppingCart) shoppingCart.classList.remove("cartOpen");
                }}
              >
                ZAMKNIJ
              </span>
              {cartList}

              <span class="sum">SUMA: {sum.toFixed(2)}</span>

              <a href="/koszyk">
                <span className="close">Przejdz do kasy</span>
              </a>
            </div>

            <Switch>
              <Route exact path="/">
                <Header />
                <div className="container">
                  <CategoriesMain />
                <MoreItems />
                </div>
              </Route>
              <Route path="/admin" component={Admin} />
              <Route exact path="/mezczyzni" component={Men} />
              <Route exact path="/suknie-slubne" component={Bride} />
              <Route exact path="/wyprzedaze" component={Discount} />
              <Route exact path="/o-nas" component={About} />
              <Route exact path="/kobiety" component={Women} />

              <Route
                path="/koszyk"
                render={props => (
                  <Cart
                    {...props}
                    cookiesDeleteItem={this.cookiesDeleteItem}
                    clearCart={this.clearCart}
                    isAuthed={true}
                  />
                )}
              />
              <Route
                path="/product/:id"
                render={props => (
                  <Item
                    {...props}
                    addItemToCart={this.addItemToCart}
                    isAuthed={true}
                  />
                )}
              />
              <Route path="/:mainCat/:category" component={Productpage} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </>
    );
  }
}

export default App;
