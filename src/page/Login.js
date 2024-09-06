import "../App.css";
import React, { useState } from 'react';
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
  BrowserRouter as Router, Routes, Route,
  Navigate, Outlet
} from 'react-router-dom';

function Login(props) {
  const { saveUserInfo } = props;
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const handleLogin = async () => {
    try {
      const body = { email: Email, password: Password };
      const response = await fetch('http://localhost:6969/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      const data = await response.json();
       if (data.status) {
           saveUserInfo(data.data);
       }
       else {
           alert('Đăng nhập thất bại')
       }
    } catch (error) {
      console.log(error);
      alert('Đăng nhập thất bại' + error.message)
    }
  }

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
          type="password"
          placeholder="Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        
        <Button
          variant="primary"
          type="button"
          onClick={handleLogin}
        >
          Đăng nhập
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
