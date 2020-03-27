import React from "react";
import "./css/About.css";
export default function About() {


  return (
    <>
      <div className="map-section">
        <iframe
          className="google-map map-section__map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10341.501607079746!2d19.926954!3d49.609527!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4966422d56a0ed4e!2sKacztex%20Hurtownia%20Odzie%C5%BCy%20Sklep%20Odzie%C5%BCowy!5e0!3m2!1spl!2spl!4v1585333089422!5m2!1spl!2spl"
          frameborder="0"
          style={{ border: 0 }}
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        ></iframe>
        <div className=" map-section__text">
          <div>
            <i class="fas fa-location-arrow"></i>
          </div>
          <div >
            <span className="about-column__big-text">Gdzie jesteśmy?</span>
            Krawiectwo Konfekcyjne kacztex
            <br />
            34-713 Skawa
            <br />
            Skawa 558A
          </div>
        </div>
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
          <span className="about-column__big-text">wYSOKA JAKOŚĆ</span>
          Naszym celem jest projektowanie ubiorów wygodnych, a zarazem
          eleganckich i szykownych. Staramy się łączyć to, co w odzieży
          klasyczne, z odrobiną stylu odzieżowego lub sportowego. Szczególną
          uwagę przywiązujemy do wykończenia wyrobów. Wiemy, że właśnie dbałość
          o szczegóły decyduje o ostatecznym efekcie i jednocześnie ma istotny
          wpływ na trwałość odzieży.
        </div>
      </div>

      <div className="about-column">
        <div className="about-column__divider aboutimg"></div>
        <div className="about-column__divider">
          <span className="about-column__big-text">Lata doświadczenia</span>
          <br></br>
          Istniejemy od 1997 roku i jesteśmy gotowi, aby stać się wiodącym
          graczem na światowym rynku mody oraz udowodnić, że ubrania niedrogie
          mogą odpowiadać najnowszym trendom. Za pośrednictwem mediów
          społecznościowych chcemy pokazywać Ci najnowsze i zawsze aktualne
          trendy oraz modowe inspiracje.
        </div>
      </div>
    </>
  );
}
