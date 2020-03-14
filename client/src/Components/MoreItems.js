import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/CategoriesMain.css";
import SingleItem from "./SingleItem.js";

export default class CategoriesMain extends Component {
  state = {
    items: [],
    ids: []
  };

  handleScroll = () => {
    const slider1 = document.querySelector(
      ".main-categories-container--more-items"
    );
    let isClicked = false;
    let startPosition = null;
    let diff;
    let transformX = 0;
    let target = null;
    let x = null;
    const down = e => {
      isClicked = true;
      startPosition = e.screenX;
      target = e.target;
      x = slider1.scrollLeft;
      e.preventDefault();
    };

    const move = e => {
      if (isClicked) {
        diff = e.screenX - startPosition;

        transformX = x - 1.2 * diff;
        console.log({ diff, x, transformX });
        slider1.scroll({
          top: 0,
          left: transformX
        });

        target.style.pointerEvents = "none";
      }
    };

    const up = e => {
      isClicked = false;
      if (target) target.style.pointerEvents = "auto";
      e.preventDefault();
    };

    slider1.addEventListener("mousedown", down);
    slider1.addEventListener("mousemove", move);
    slider1.addEventListener("mouseup", up);
    slider1.addEventListener("mouseleave", up);
  };
  handleScrollClick = side => {
    const slider = document.querySelector(
      ".main-categories-container--more-items"
    );
    const x = slider.scrollLeft;

    const category = document.querySelector(
      ".main-categories-container--more-items .item"
    );
    const categoryWidth = category.offsetWidth;

    const scrollInX = 2 * side * categoryWidth + x;
    slider.scroll({
      top: 0,
      left: scrollInX,
      behavior: "smooth"
    });
  };
  loadIndex = () => {
    fetch(`/api/products/wybor`)
      .then(res => res.json())
      .then(res => {
        console.log("mount");

        const ids = res.response[0].polecane;
        this.setState({
          ids
        });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.loadIndex();
    this.handleScroll();
  }

  render() {
    const { ids } = this.state;
    // console.log({ ids });
    const products = ids.map(id => {
      return <SingleItem id={id} />;
    });

    return (
      <>
        <div className="category__text-container ">
          <div className="category__text-background "></div>

          <span className="category__text ">POLECANE PRODUKTY </span>
        </div>
        <div className="main-categories-container ">
          <div className="main-categories main-categories-container--more-items">
            {products}
          </div>

          <div
            onClick={() => this.handleScrollClick(-1)}
            className="main-categories__arrow main-categories__arrow--left "
          >
            <i class="fas fa-chevron-left"></i>
          </div>
          <div
            onClick={() => this.handleScrollClick(1)}
            className="main-categories__arrow main-categories__arrow--right "
          >
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
      </>
    );
  }
}
