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
    const slider = document.querySelector(
      ".main-categories-container--more-items"
    );
    let lastCategory = null;
    console.log(lastCategory);
    let isClicked = false;
    let startPosition = null;
    let diff;
    let transformX = 0;
    let width = 0;
    let target = null;
    const down = e => {
      isClicked = true;
      startPosition = e.clientX;
      lastCategory = document.querySelector(".item--moreproducts:last-child");
      const matrixPos = window
        .getComputedStyle(slider)
        .getPropertyValue("transform");

      if (matrixPos !== "none") {
        transformX = parseInt(matrixPos.split(",")[4]);
      }
      target = e.target;
      e.preventDefault();
    };

    const move = e => {
      if (isClicked && lastCategory.getBoundingClientRect) {
        const x = lastCategory.getBoundingClientRect().x.toFixed(2);
        diff = e.clientX - startPosition;
        if (transformX + diff > 0) return;
        if (x <= window.innerWidth * 0.99 - lastCategory.offsetWidth) {
          if (diff > 0) {
            slider.style.transform = `translateX(${transformX + diff}px)`;
          }
          return;
        }

        slider.style.transform = `translateX(${transformX + diff}px)`;
        target.style.pointerEvents = "none";
      }
    };

    const up = e => {
      isClicked = false;
      if (target) target.style.pointerEvents = "auto";
      e.preventDefault();
    };

    if (window.PointerEvent) {
      console.log("pointer");

      slider.addEventListener("pointerdown", down);
      slider.addEventListener("pointermove", move);
      slider.addEventListener("pointerup", up);
    } else {
      console.log("desc");

      slider.addEventListener("touchdown", down);
      slider.addEventListener("touchmove", move);
      slider.addEventListener("touchup", up);
      slider.addEventListener("mousedown", down);
      slider.addEventListener("mousemove", move);
      slider.addEventListener("mouseleave", up);
      window.addEventListener("mouseup", up);
    }
  };

  loadIndex = () => {

    fetch(`/api/products/wybor`)
      .then(res => res.json())
      .then(res => {
    console.log('mount');

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
        <div className="main-categories-container ">
          <div className="category__text-container ">
            <div className="category__text-background "></div>

            <span className="category__text ">POLECANE PRODUKTY </span>
          </div>
          <div className="main-categories main-categories-container--more-items">
            {products}
          </div>
        </div>
      </>
    );
  }
}
