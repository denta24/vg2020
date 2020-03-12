import React, { Component } from "react";
import "./css/AdminProducts.css";

export default class AdminProducts extends Component {
  state = {
    isLoaded: false
  };

  loadItem = () => {
    fetch("/api/allProducts")
      .then(res => res.json())
      .then(res => {
        console.log("eee");
        const items = res.items;
        this.setState({ items, isLoaded: true });
      });
  };

  async componentDidMount() {
    this.loadItem();
  }

  render() {
    if (this.state.isLoaded) {
      const { items } = this.state.items;
      console.log(items);
      const listOfProducts = items.map(item => {
        return (
          <tr>
            <th>{item.id}</th>
            <a href={`/product/${item.id}`}>
              <img src={item.imgSrc[0]} width="100" alt="" />
            </a>
            <th>{item.name}</th>
            <th>{item.mainCategory}</th>
            <th>{item.category}</th>
            <th>{item.subcategory}</th>
            <th>{item.prize}</th>
            <th>{item.size.join(", ")}</th>
            <th>{item.color}</th>
          </tr>
        );
      });

      return (
        <>
          <table>
            <tr>
              <th>ID</th>
              <th>Zdjęcie głowne</th>
              <th>Nazwa</th>
              <th>Głowne Menu</th>
              <th>Rozwijane Menu</th>
              <th>Kategoria</th>
              <th>Cena</th>
              <th>Rozmiary</th>
              <th>Kolor</th>
            </tr>
            {listOfProducts}
          </table>
        </>
      );
    } else return <h2 className="product__name">Loading...</h2>;
  }
}
