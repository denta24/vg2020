import React from "react";
import Cookies from "js-cookie";

export default function AdminMenu() {
  return (
    <>
      <div className="headerProductsSite headerProductsSite--admin">
        <div className="absoluteHeader"></div>
        <div className="productSelectedName">
          <h2 className="productSelectedName__typeInfo">Velluto Giorno</h2>
          <h1 className="productSelectedName__type">Panel Admina</h1>
        </div>
      </div>
      <div className="panel">
        <div className="panel__menu">
          <a className="panel__menuItem" href="/admin/add">
            Dodaj produkt
          </a>
          <a className="panel__menuItem" href="/admin/products">
            Wszystkie produkty
          </a>
          <a className="panel__menuItem" href="/admin/orders">
            Zamowienia
          </a>
          <a
            onClick={e => {
              Cookies.remove("VGadminKEY");
            }}
            className="panel__menuItem"
            href="/admin"
          >
            wyloguj
          </a>
        </div>
      </div>
    </>
  );
}
