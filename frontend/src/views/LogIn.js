import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt as login, faUserPlus as signup } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash as hide, faEye as show } from '@fortawesome/free-regular-svg-icons'

var userAuth = false;


function showPass() {
  var x = document.getElementById("user-pass");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function showSignupPass() {
  var x = document.getElementById("new-user-pass");
  var y = document.getElementById("confirm-user-pass");
  if (x.type === "password") {
    x.type = "text";
    y.type = "text";
  } else {
    x.type = "password";
    y.type = "password";
  }
}


export default class LogIn extends Component {
  state = {
  }

  render () {
    if (userAuth) {
        // BOUNCE-BACK ON AUTH
        return (
          <>
            <h1>LOGGED IN</h1>
          </>
        )
      } else {
      // LOG-IN FIELD
      return (
        <>
          <div className="hero">
            <div className="hero-inner">
              <h1>Login to an existing account.</h1>
              <span className="sub-title">
                  <Link to="/login#signup-col">Not a member? Create an account.</Link>
              </span>
            </div>
          </div>
          <Container className="login-portal">
            <Row>
              <Col lg={5.75}>
                <h1>Login</h1>
                <form>
                  <label className="text-input-label" htmlFor="user-email" >Email:</label>
                  <input id="user-email" className="input-text" type="email" autoComplete="username" required></input>
                  <label className="text-input-label" htmlFor="user-pass">Password:</label>
                  <input id="user-pass" className="input-text" type="password" autoComplete="current-password" required></input>
                  <div id="remember-me-wrapper">
                    <input type="checkbox" id="remember-me"></input><label htmlFor="remember-me">&nbsp;Keep me logged in</label>
                    <input type="checkbox" id="show-pass" onClick={showPass}></input>
                    <label htmlFor="show-pass" id="show-label">
                      <FontAwesomeIcon icon={show} id="show-icon"></FontAwesomeIcon>
                      <FontAwesomeIcon icon={hide} id="hide-icon"></FontAwesomeIcon>
                      &nbsp;Show Password
                    </label>
                  </div>
                  <button type="submit"><FontAwesomeIcon icon={login} />&nbsp; Login</button>
                </form>
              </Col>
              <Col lg={0.5}>
                <div className="divider"></div>
              </Col>
              <Col lg={5.75} id="signup-col">
                <h1>Signup</h1>
                <form>
                  <label className="text-input-label" htmlFor="user-email" >Account Email:</label>
                  <input id="user-email" className="input-text" type="email" required></input>
                  <label className="text-input-label" htmlFor="user-pass" >Create a Password:</label>
                  <input id="new-user-pass" className="input-text" type="password" required autoComplete="new-password" ></input>
                  <label className="text-input-label" htmlFor="user-pass" >Confirm Password:</label>
                  <input id="confirm-user-pass" className="input-text" type="password" required autoComplete="new-password" ></input>
                  <div id="remember-me-wrapper">
                    <input type="checkbox" id="show-signup-pass" onClick={showSignupPass}></input>
                    <label htmlFor="show-signup-pass" id="show-signup-label">
                      <FontAwesomeIcon icon={show} id="show-signup-icon"></FontAwesomeIcon>
                      <FontAwesomeIcon icon={hide} id="hide-signup-icon"></FontAwesomeIcon>
                      &nbsp;Show Password
                    </label>
                  </div>
                  <button type="submit"><FontAwesomeIcon icon={signup} />&nbsp; Signup</button>
                </form>
              </Col>
            </Row>
          </Container>
        </>
      )
    }
   }
}
