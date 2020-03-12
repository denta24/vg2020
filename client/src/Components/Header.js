import React, { useState, useEffect } from "react";
import gsap from "gsap";

import "./css/Header.css";
export default function Header() {
  // useEffect(() => handleAnimations(), []);

  const handleAnimations = () => {
    const mainSite = document.querySelectorAll(".gender__divider");
    const headerAllWrapper = document.querySelector(".headerAllWrapper")
      .childNodes;

    gsap.from(headerAllWrapper, {
      delay: 2,
      x: -100,
      opacity: 0,
      stagger: 0.3
    });
    gsap.from(mainSite, {
      delay: 2,
      scale: 0.9,
      x: -100,
      opacity: 0,
      stagger: 0.5
    });
    console.log(mainSite);
    // .from(title, 2, {
    //   x: 300,
    //   opacity: 0
    // });
  };

  return (
    <>
      <div className="headerAllWrapper">
        <header>
          <div className="txtContainer">
            <span className="txt">Witamy u nas</span>
            <p></p>
            <button className="header__button">SPRAWDŹ</button>
          </div>
          <div className="transp"></div>
        </header>

        <div className="container">
          <div className="category__text-background">
            <span className="category__text">ZNAJDŹ COŚ DLA SIEBIE</span>
          </div>
        </div>
        <div className="genderApp">
          <div
            className="gender__divider"
            onClick={() => {
              window.location.href = "/kobiety";
            }}
          >
            <div className="gender__text">KOBIETY</div>
          </div>
          <div
            onClick={() => {
              window.location.href = "/mezczyzni";
            }}
            className="gender__divider"
          >
            <div className="gender__text">MĘŻCZYŹNI</div>
          </div>
        </div>
      </div>
    </>
  );
}
