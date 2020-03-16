import React from "react";
import "./css/Footer.css";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="divider">
          <div className="title">
            <span>Dane kontaktowe</span>
          </div>
          <div className="title">
            <i className="fas fa-mobile-alt"></i>
            534 325 980
          </div>
          <div className="title">
            <i className="fas fa-mobile-alt"></i>600 441 542
          </div>
          <div className="title">
            <i className="fas fa-envelope"></i>
            kacztex@wp.pl
          </div>
        </div>
        <div className="divider ">
          <div className="title">
            <span>O nas</span>
          </div>
          <div className="title onas">
            <div className="imgContainer"></div>
            <p>
              W naszej ofercie znajdą Państwo damską oraz męską odzież góralską.
              Łączymy dorobek kultury góralskiej z nowoczesnym spojrzeniem na
              folk, wpisując ludowe motywy w oferowane przez nas stroje.
            </p>
          </div>
        </div>
        <div className="divider">
          <div className="title">
            <span>Polub nas!</span>
          </div>

          <div
            className="fb-page"
            data-href="https://www.facebook.com/VellutoGiorno"
            data-width="380"
            data-hide-cover="false"
            data-show-facepile="true"
          ></div>
        </div>
      </footer>
      <div className="black">
        &#169;Velluto Giorno 2020. Wszystkie prawa zastrzeżone /{" "}  
        <a href="/polityka-prywatnosci">Polityka prywatności</a>
      </div>
    </>
  );
}
