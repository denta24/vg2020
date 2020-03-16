import React, { useState } from "react";
import Cookies from "js-cookie";

export default function AdminLogin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    fetch("/api/AdminLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ login, password })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        const { isAuth, key } = res;
        if (isAuth) {
          Cookies.set("VGadminKEY", key, {
            expires: 1
          });
          window.location = "/admin";
        } else alert("Złe dane");
      });
  };
  return (
    <div className="admin-login">
      ZALOGUJ SIE
      <form
        onSubmit={handleSubmit}
        className="admin-form"
        action="sumbit"
        method="post"
      >
        <input
          onChange={e => {
            setLogin(e.target.value);
          }}
          type="text"
          name="login"
          placeholder="login"
          value={login}
          id="login"
        />
        <input
          onChange={e => {
            setPassword(e.target.value);
          }}
          value={password}
          type="password"
          name="password"
          placeholder="haslo"
          id="password"
        />
        <input onClick={handleSubmit} type="button" value="Zaloguj" />
      </form>
    </div>
  );
}
