import React, { useEffect } from "react";

import MoreItems from "./MoreItems.js";
import CategoriesMain from "./CategoriesMain.js";
import "./css/site.css";

export default function Women() {
  const handleScroll = () => {
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
          </div>
        </div>
      </div>
      <div className="container">
        <MoreItems />
      </div>
    </>
  );
}
