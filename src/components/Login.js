import React from "react";
import { Input, Button, Form } from "antd";
import Logo from "../assets/logos/logo_inline.svg";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "antd/lib/form/style/css";
import "antd/lib/input/style/css";
import "antd/lib/button/style/css";
import "./Login.css";

const { Item } = Form;
const { Password } = Input;

const Login = () => {
  return (
    <Form noValidate>
      <div className="logo">
        <Logo />
      </div>
      <Item name="email" style={{ marginBottom: 10 }}>
        <Input
          placeholder="Adresse mail"
          prefix={<UserOutlined />}
          style={{ width: 250 }}
        />
      </Item>
      <Item name="password" style={{ marginBottom: 10 }}>
        <Password
          placeholder="Mot de passe"
          prefix={<LockOutlined />}
          style={{ width: 250 }}
        />
      </Item>
      <Button block type="primary">
        Connexion
      </Button>
    </Form>
  );
};

export default Login;
