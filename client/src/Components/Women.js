import React, { useEffect } from "react";

import MoreItems from "./MoreItems.js";
import CategoriesMain from "./CategoriesMain.js";
import "./css/site.css";

export default function Women() {
  const handleScroll = () => {
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
  const handleScrollClick = side => {
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

  const categoriesInfo = [
    ["Sukienki", "sukienki", "/photos/dressCategory.jpg"],
    ["Suknie na studniówkę", "sukienki-na-studniowke", "/photos/prom.jpg"],
    ["Koszule", "koszule", "/photos/shirt.jpg"],
    ["Kurtki & Płaszcze", "kurtki-plaszcze", "/photos/coat.jpg"],
    ["Obuwie", "obuwie", "/photos/szpilki.jpg"],
    ["Spodnie", "spodnie", "/photos/trousers.jpg"],
    ["Biżuteria", "bizuteria", "/photos/biz.jpg"],
    ["Torebki", "torebki", "/photos/handbag.jpg"]
  ];

  const categories = categoriesInfo.map(category => (
    <div className="category">
      <div className="category__img-container">
        <a href={`/kobiety/${category[1]}`}>
          <img class="category__img" src={category[2]} alt=""></img>
        </a>
      </div>
      <div className="category__imgtext-bg">
        <span className="category__imgtext">{category[0]}</span>
      </div>
    </div>
  ));
  useEffect(() => {
    handleScroll();
    console.log("mounted");
  }, []);

  return (
    <>
      <div class="headerSite">
        <div className="productSelectedName productSelectedName--site">
          <h2 className="productSelectedName__typeInfo">kobiety</h2>
        </div>
      </div>
      <div className="container">
        <div className="category__text-background">
          <span className="category__text">PRZEGLADAJ WEDŁUG KATEGORII</span>
          <div className="main-categories-container">
            <div className="main-categories">{categories}</div>

            <div
              onClick={() => handleScrollClick(-1)}
              className="main-categories__arrow main-categories__arrow--left "
            >
              <i class="fas fa-chevron-left"></i>
            </div>
            <div
              onClick={() => handleScrollClick(1)}
              className="main-categories__arrow main-categories__arrow--right "
            >
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <MoreItems />
      </div>
    </>
  );
}
