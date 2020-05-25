import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Axios from "axios";
import Login from "./components/Login";
import Header from "./components/Header";
import FavList from "./components/FavList";
import "antd/lib/spin/style/css";

const isChrome = navigator.userAgent.indexOf("Chrome") != -1;

const Popup = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    browser.storage.local.remove("token");
    return setUser(null);
  };

  const loginFromToken = () => {
    const authToken = browser.storage.local.get("token");

    authToken.then(async ({ token }) => {
      if (token) {
        try {
          const response = await Axios.get(
            `http://localhost:3000/api/plugin/user/${token}`
          );

          setUser(response.data.data.user);
        } catch (error) {
          setUser(null);
          browser.storage.local.remove("token");
        }

        return setLoading(false);
      } else {
        setUser(null);
        return setLoading(false);
      }
    }, null);
  };

  useEffect(() => {
    loginFromToken();
  }, []);

  useEffect(() => {
    browser.storage.onChanged.addListener(loginFromToken);

    return () => {
      browser.storage.onChanged.removeListener(loginFromToken);
    };
  }, []);

  return (
    <div style={{ width: user ? 600 : 300 }}>
      {loading ? (
        <Spin indicator={<LoadingOutlined />} />
      ) : user ? (
        <div>
          <Header onLogout={handleLogout} />
          <FavList favorites={user.favorites} />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Popup;
