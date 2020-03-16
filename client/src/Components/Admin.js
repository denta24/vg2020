import React, { useEffect, useState } from "react";
import "./css/Admin.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cookies from "js-cookie";

import AdminLogin from "./AdminLogin";
import AdminMenu from "./AdminMenu.js";
import AdminAdd from "./AdminAdd.js";
import AdminProducts from "./AdminProducts.js";
import AdminOrders from "./AdminOrders.js";

export default function Admin() {
  const [auth, setauth] = useState(false);

  useEffect(() => {
    console.log("zalogowano/wylogowano");
  }, [auth]);

  useEffect(() => {
    const key = Cookies.get("VGadminKEY");
    if (key === "eyJrIjoiT0tTcG1pUlY2RnVKZTFVaDFsNFZXdE9ZWmNrMkZYbk") {
      setauth(true);
    }

    console.log("render");
  }, []);
 
  const logged = [
    <>
      <AdminMenu />
      <Router>
        <Route path="/admin/add" component={AdminAdd} />
        <Route path="/admin/products" component={AdminProducts} />
        <Route path="/admin/orders" component={AdminOrders} />
      </Router>
    </>
  ];

  return auth ? logged : <AdminLogin />;
}
