import React, { Component, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/Navi.css";
import gsap from "gsap";

const categoriesNav = [
  {
    name: ["Kobiety", "kobiety"],
    titles: [
      ["Sukienki", "sukienki"],
      ["Suknie na studniówkę", "sukienki-na-studniowke"],
      ["Kurtki & Płaszcze", "kurtki-plaszcze"],
      ["Spodnie", "spodnie"],
      ["Koszule", "koszule"],
      ["Obuwie", "obuwie"],
      ["Biżuteria", "bizuteria"],
      ["Torebki", "torebki"]
    ]
  },
  {
    name: ["Meżczyźni", "mezczyzni"],
    titles: [
      ["Garnitury", "garnitury"],
      ["Marynarki", "marynarki"],
      ["Koszule", "koszule"],
      ["Spodnie", "spodnie"],
      ["Płaszcze", "plaszcze"],
      ["Obuwie", "obuwie"],
      ["Akcesoria", "akcesoria"]
    ]
  },
  {
    name: ["Suknie ślubne", "suknie-slubne"],
    titles: [
      ["Suknie", "suknie"],
      ["Obuwie", "obuwie"],
      ["Dodatki", "dodatki"]
    ]
  }
];

export default function Navi() {

 



  const navCat = categoriesNav.map(main => {
    const insideNavCat = main.titles.map(item => {
      const path = `/${main.name[1]}/${item[1]}`;
      const linkProps = {
        pathname: path,
        state: {
          pathName: { mainCat: main.name[0], category: item[0] },
          pathLink: { mainCat: main.name[1], category: path }
        }
      };

      return (
        <li className="elements">
          <a className="a_navi" href={path}>
            {item[0]}
          </a>
        </li>
      );
    });

    return (
      <li className="titleElements">
        <a className="a_navi" href={`/${main.name[1]}`}>
          {main.name[0]}
        </a>
        <div className="expandableElementsContainer">{insideNavCat}</div>
      </li>
    );
  });
  const hamburgerClick = () => {
    document.querySelector(".nav-options").classList.toggle("menuOpen");
    document.querySelector(".hamburger").classList.toggle("menuOpenHam");

    if (document.querySelector(".nav-options").classList.contains("menuOpen")) {
      const titles = document.querySelectorAll(".titleElements");
      gsap.from(titles, { x: 300, opacity: 0, stagger: 0.2 });
    }
  };
  const menuIn = e => {};
  return (
    <>
      <nav className="navigation">
        <div onClick={hamburgerClick} className="hamburger">
          <div className="hamburger__line"></div>
          <div className="hamburger__line"></div>
          <div className="hamburger__line"></div>
        </div>
        <a className="logos" href="/">
          <img className="imglogo" src="/photos/logo4.jpg" alt="" />
        </a>
      </nav>

      <div className="nav-options">
        <div style={{ height: "6vh" }}></div>

        <ul className="elementsList">
          {navCat}

          <li className="titleElements">
            <a className="a_navi" href="/wyprzedaze">
              Wyprzedaże
            </a>
          </li>
          <li className="titleElements">
            <a className="a_navi" href="/o-nas">
              o nas
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
