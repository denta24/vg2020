import React from "react";
import "./css/Admin.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AdminMenu from "./AdminMenu.js";
import AdminAdd from "./AdminAdd.js";
import AdminProducts from "./AdminProducts.js";
import AdminOrders from "./AdminOrders.js";

export default function Admin() {
  return (
    <>
      <AdminMenu />

      <Router>
        <Route path="/admin/add" component={AdminAdd} />
        <Route path="/admin/products" component={AdminProducts} />
        <Route path="/admin/orders" component={AdminOrders} />
      </Router>
    </>
  );
}
