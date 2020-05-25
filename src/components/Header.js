import React from "react";
import { PageHeader, Button, Tooltip } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Logo from "../assets/logos/logo_inline.svg";
import "antd/lib/page-header/style/css";
import "antd/lib/button/style/css";
import "antd/lib/tooltip/style/css";
import "./Header.css";

const Header = ({ onLogout }) => (
  <PageHeader
    style={{ padding: 10, height: 70 }}
    title={
      <div className="logo">
        <a href="https://biblidev.fr" rel="noopener noreferrer" target="_blank">
          <Logo />
        </a>
      </div>
    }
    extra={[
      <Tooltip title="Déconnexion" placement="bottomRight">
        <Button icon={<LogoutOutlined />} onClick={onLogout} />
      </Tooltip>,
    ]}
  />
);

export default Header;
