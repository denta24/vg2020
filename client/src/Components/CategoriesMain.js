import React, { Component, useEffect } from "react";
import "./css/CategoriesMain.css";

export default class CategoriesMain extends Component {
  handleScroll = () => {
    const slider = document.querySelector(
      ".main-categories-container"
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
      lastCategory = document.querySelector(".category:last-child");
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
      if (isClicked) {
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
        // target.style.pointerEvents = "none";
      }
    };

    const up = e => {
      isClicked = false;
      // if (target) target.style.pointerEvents = "auto";
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

  componentDidMount() {
    this.handleScroll();
  }
  render() {
    const categoriesInfo = [
      ["Sukienki", "/kobiety/sukienki", "/photos/dressCategory.jpg"],
      ["Garnitury", "/mezczyzni/garnitury", "/photos/suit.jpg"],
      ["Marynarki", "/mezczyzni/marynarki", "/photos/jacket.jpg"],
      ["Kurtki & Płaszcze", "/kobiety/kurtki-plaszcze", "/photos/coat.jpg"],
      ["Koszule", "/mezczyzni/koszule", "/photos/shirtsuit.jpg"],
      ["Spodnie", "/mezczyzni/spodnie", "/photos/trousersmen.jpg"],
      ["Płaszcze", "/mezczyzni/plaszcze", "/photos/menjacket.jpg"],
      ["Obuwie", "/mezczyzni/obuwie", "/photos/shoes.jpg"],
      ["Akcesoria", "/mezczyzni/akcesoria", "/photos/tie.jpg"],
      ["Obuwie", "/kobiety/obuwie", "/photos/szpilki.jpg"],
      [
        "Suknie na studniówkę",
        "/kobiety/sukienki-na-studniowke",
        "/photos/prom.jpg"
      ],
      ["Koszule", "/kobiety/koszule", "/photos/shirt.jpg"],
      ["Spodnie", "/kobiety/spodnie", "/photos/trousers.jpg"],
      ["Biżuteria", "/kobiety/bizuteria", "/photos/biz.jpg"],
      ["Torebki", "/kobiety/torebki", "/photos/handbag.jpg"]
    ];

    const categories = categoriesInfo.map(category => (
      <div className="category">
        <div className="category__img-container">
          <a href={category[1]}>
            <img class="category__img" src={category[2]} alt=""></img>
          </a>
        </div>
        <div className="category__imgtext-bg">
          <span className="category__imgtext">{category[0]}</span>
        </div>
      </div>
    ));
    return (
      <>
        <div className="container">
          <div className="category__text-background">
            <span className="category__text">PRZEGLADAJ WEDŁUG KATEGORII</span>
          </div>
        </div>
        <div className="main-categories-container">
          <div className="main-categories">
            <div className="category__text-container">
              <div className="category__text-background"></div>
            </div>

            {categories}
          </div>
        </div>
      </>
    );
  }
}
