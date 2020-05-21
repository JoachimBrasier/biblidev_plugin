import React, { useState } from "react";
import Axios from "axios";
import { Input, Button, Form, message, Alert } from "antd";
import Logo from "../assets/logos/logo_inline.svg";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "antd/lib/form/style/css";
import "antd/lib/input/style/css";
import "antd/lib/button/style/css";
import "antd/lib/message/style/css";
import "antd/lib/alert/style/css";
import "./Login.css";

const { Item } = Form;
const { Password } = Input;

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    if (event.persist) event.persist();

    setValues((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const saveToken = (token) => {
    setErrors({});
    browser.storage.local.set({ token });
    return setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await Axios.post(
        "http://localhost:3000/api/plugin/login",
        values
      );

      return saveToken(response.data.data.token);
    } catch (error) {
      setLoading(false);

      if (error.response.data.message) {
        return setErrors({ message: error.response.data.message });
      }

      return setErrors(error.response.data.data);
    }
  };

  return (
    <Form noValidate onFinish={handleSubmit} style={{ width: 300 }}>
      <div className="logo">
        <Logo />
      </div>
      {errors.message && (
        <Alert
          type="error"
          showIcon
          message={errors.message}
          style={{ maxWidth: "100%", marginBottom: 10 }}
        />
      )}
      <Item
        style={{ marginBottom: 10 }}
        hasFeedback={!!errors.email}
        validateStatus={!!errors.email && "error"}
        help={!!errors.email && errors.email}
      >
        <Input
          name="email"
          placeholder="Adresse mail"
          prefix={<UserOutlined />}
          style={{ width: "100%" }}
          value={values.email}
          onChange={handleChange}
          disabled={loading}
        />
      </Item>
      <Item
        style={{ marginBottom: 0 }}
        hasFeedback={!!errors.password}
        validateStatus={!!errors.password && "error"}
        help={!!errors.password && errors.password}
      >
        <Password
          name="password"
          placeholder="Mot de passe"
          prefix={<LockOutlined />}
          style={{ width: "100%" }}
          value={values.password}
          onChange={handleChange}
          disabled={loading}
        />
      </Item>
      <Form.Item style={{ margin: 0, marginBottom: 10, textAlign: "right" }}>
        <a href="https://biblidev.fr/mot-de-passe-oublie" target="_blank">
          Mot de passe oublié ?
        </a>
      </Form.Item>
      <Button htmlType="submit" block type="primary" loading={loading}>
        Connexion
      </Button>
    </Form>
  );
};

export default Login;
