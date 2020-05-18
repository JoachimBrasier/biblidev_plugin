import React, { useEffect, useState } from "react";
import Login from "./components/Login";

const isChrome = navigator.userAgent.indexOf("Chrome") != -1;

const Popup = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authToken = browser.storage.local.get("auth");

    authToken.then(({ auth }) => {}, null);
  }, []);

  return <div style={{ padding: 30 }}>{user ? "Connecté" : <Login />}</div>;
};

export default Popup;
