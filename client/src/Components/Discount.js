import React, { Component } from "react";
import SingleItem from "./SingleItem.js";

export default class Discount extends Component {
  state = {
    items: [],
    ids: []
  };

  loadIndex = () => {
    console.log("eeee");
    fetch(`/api/products/wybor`)
      .then(res => res.json())
      .then(res => {
        const ids = res.response[0].przecena;
        this.setState({
          ids
        });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.loadIndex();
  }

  render() {
    const { ids } = this.state;
    // console.log({ ids });
    const products = ids.map(id => {
      return <SingleItem id={id} />;
    });

    return (
      <>
        <div
          style={{
            backgroundImage: "url('/photos/szafaaa.jpg')",
            backgroundSize: "cover"
          }}
          className="headerProductsSite"
        >
          <div className="absoluteHeader"></div>
          <div className="productSelectedName">
            <h2 className="productSelectedName__typeInfo">WYPRZEDAŻE</h2>
            <h1 className="productSelectedName__type">ostatnie sztuki</h1>
          </div>
        </div>
          <div style={{ height: "6vh" }}></div>
        <div className="main-categories-container ">
          <div className="main-categories main-categories-container--more-items">
            {products}
          </div>
        </div>
      </>
    );
  }
}
