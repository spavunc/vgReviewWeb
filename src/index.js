import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router } from "@reach/router";
import Game from "./Game";
import Home from "./Home";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Row, Col, Container } from 'react-bootstrap';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import RegisterComponent from './RegisterComponent';

ReactDOM.render(
  <React.StrictMode>
    <Container>
      <Row>
        <App />
      </Row>
      <br/>
      <Row>
        <Router>
          <Home path="/" />
          <LoginComponent path="/login"/>
          <LogoutComponent path="/logout"/>
          <RegisterComponent path="/register"/>
          <Game path="/game/:id" />
        </Router>
      </Row>
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
