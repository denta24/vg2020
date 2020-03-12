import React, { useEffect } from "react";

import MoreItems from "./MoreItems.js";
import CategoriesMain from "./CategoriesMain.js";
import "./css/site.css";

export default function Bride() {
  const categoriesInfo = [
    ["Suknie", "suknie", "/photos/suknieslu.jpg"],
    ["Obuwie", "obuwie", "/photos/brideshoes.jpg"],
    ["Dodatki", "dodatki", "/photos/addosn.jpg"]
  ];

  const categories = categoriesInfo.map(category => (
    <div className="category">
      <div className="category__img-container">
        <a href={`/suknie-slubne/${category[1]}`}>
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
      <div
        style={{ backgroundImage: "url('/photos/sukniess.jpg')" }}
        class="headerSite"
      >
          <div className="productSelectedName productSelectedName--site">
            <h2 className="productSelectedName__typeInfo">suknie ślubne</h2>
          </div>
      </div>
        <div  className="category__text-background">
          <span className="category__text">PRZEGLADAJ WEDŁUG KATEGORII</span>
          <div className="main-categories-container">
            <div  className="main-categories main-categories--bride">
              {categories}
            </div>
          </div>
        </div>
      <div className="container">
        <MoreItems />
      </div>
    </>
  );
}
