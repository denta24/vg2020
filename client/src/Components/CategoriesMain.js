import React, { Component, useEffect } from "react";
import "./css/CategoriesMain.css";
import smoothscroll from 'smoothscroll-polyfill';
export default class CategoriesMain extends Component {
  handleScroll = () => {
    const slider = document.querySelector(".main-categories");
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
      x = slider.scrollLeft;
      e.preventDefault();
    };

    const move = e => {
      if (isClicked) {
        diff = e.screenX - startPosition;

        transformX = x - 1.2 * diff;
        console.log({ diff, x, transformX });
        slider.scroll({
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

    slider.addEventListener("mousedown", down);
    slider.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };
  handleScrollClick = side => {
    const slider = document.querySelector(".main-categories");
    const x = slider.scrollLeft;

    const category = document.querySelector(".main-categories .category");
    const categoryWidth = category.offsetWidth;

    const scrollInX = 2 * side * categoryWidth + x;
    slider.scroll({
      top: 0,
      left: scrollInX,
      behavior: "smooth"
    });
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
