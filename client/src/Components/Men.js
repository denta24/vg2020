import React, { useEffect } from "react";

import MoreItems from "./MoreItems.js";
import CategoriesMain from "./CategoriesMain.js";
import "./css/site.css";

export default function Men() {
  const handleScroll = () => {
    const slider = document.querySelector(
      ".main-categories-container.main-categories--men"
    );
    const lastCategory = document.querySelector(".category:last-child");
    let isClicked = false;
    let startPosition = null;
    let diff;
    let transformX = 0;
    let width = 0;
    let target = null;

    const down = e => {
      isClicked = true;
      startPosition = e.clientX;

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
        console.log(
          lastCategory.getBoundingClientRect().x,
          window.innerWidth * 0.99 - lastCategory.offsetWidth
        );
        diff = e.clientX - startPosition;
        if (transformX + diff > 0) return;
        if (
          lastCategory.getBoundingClientRect().x <=
          window.innerWidth * 0.99 - lastCategory.offsetWidth
        ) {
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
    ["Garnitury", "garnitury", "/photos/suit.jpg"],
    ["Marynarki", "marynarki", "/photos/jacket.jpg"],
    ["Koszule", "koszule", "/photos/shirtsuit.jpg"],
    ["Spodnie", "spodnie", "/photos/trousersmen.jpg"],
    ["Płaszcze", "plaszcze", "/photos/menjacket.jpg"],
    ["Obuwie", "obuwie", "/photos/shoes.jpg"],
    ["Akcesoria", "akcesoria", "/photos/tie.jpg"]
  ];

  const categories = categoriesInfo.map(category => (
    <div className="category">
      <div className="category__img-container">
        <a href={`/mezczyzni/${category[1]}`}>
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
  }, []);

  return (
    <>
      <div
        style={{ backgroundImage: "url('/photos/mensite.jpg')" }}
        class="headerSite productSelectedName--site"
      >
        <div className="productSelectedName productSelectedName--site">
          <h2 className="productSelectedName__typeInfo">mężczyźni</h2>
        </div>
      </div>
      <div className="container">
        <div className="category__text-background">
          <span className="category__text">PRZEGLADAJ WEDŁUG KATEGORII</span>
          <div className="main-categories-container main-categories--men">
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
