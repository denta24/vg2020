import React from "react";
import "./css/About.css";
export default function About() {
  return (
    <>
      <div className="about">
        <img className="about__img" src="/photos/about.jpg" alt="" />
      </div>
      <div className="about-column">
        <div className="about-column__divider"></div>
        <div className="about-column__divider">
          <span className="about-column__big-text">O nas</span>
          <br></br>
          Dbamy o stałą, wysoką jakość naszych wyrobów, szybko reagujemy na
          trendy i zmiany pojawiające się w modzie. Nasze kolekcje oparte są na
          własnych projektach, a charakteryzują je elegancja, różnorodność i
          niepowtarzalność fasonów.
        </div>
      </div>
      <div className="about-column ">
        <div className="about-column__divider about-column--photo"></div>
        <div className="about-column__divider about-column--text">
          <span className="about-column__big-text">LATA DOŚWIADCZENIA</span>
          <br></br>
          Najwiekszy salon ślubny na poudniu Polski. W ciąłej sprzedaży około
          150 sukni. Projektujemy, szyjemy suknie ślubne. Realizujemy
          indywidualne zamówienia
        </div>
      </div>
      
      <div className="about-column">
        <div className="about-column__divider aboutimg"></div>
        <div className="about-column__divider">
          <span className="about-column__big-text">O nas</span>
          <br></br>
          Dbamy o stałą, wysoką jakość naszych wyrobów, szybko reagujemy na
          trendy i zmiany pojawiające się w modzie. Nasze kolekcje oparte są na
          własnych projektach, a charakteryzują je elegancja, różnorodność i
          niepowtarzalność fasonów.
        </div>
      </div>
    
    </>
  );
}
