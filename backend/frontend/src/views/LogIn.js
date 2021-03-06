import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';

import * as axios from 'axios';

import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt as loginIcon, faUserPlus as signupIcon, faExclamationTriangle as errorIcon, faCheckCircle as successIcon } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash as hideIcon, faEye as showIcon } from '@fortawesome/free-regular-svg-icons'

let passMatch = true;

function showPass() {
  const x = document.getElementById("user-pass");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function showSignupPass() {
  const x = document.getElementById("new-user-pass");
  const y = document.getElementById("confirm-user-pass");
  if (x.type === "password") {
    x.type = "text";
    y.type = "text";
  } else {
    x.type = "password";
    y.type = "password";
  }
}

class LogIn extends Component {

  state = {

  }

  resetErrors() {
    var errorBlocks = document.getElementsByClassName("error");
    for (var i = 0; i < errorBlocks.length; ++i) {
      errorBlocks[i].style.display = 'none';
    }
  }

  checkPassMatch() {
    try {
      if (document.getElementById("new-user-pass").value === document.getElementById("confirm-user-pass").value || document.getElementById("confirm-user-pass").value === "") {
        passMatch = true;
        document.getElementById('match-confirm-pass').style.display = 'none';
      } else {
        passMatch = false;
        document.getElementById('match-confirm-pass').style.display = 'block';
      }
    } catch (error) {
      passMatch = false;
      document.getElementById('match-confirm-pass').style.display = 'block';
    }
  }

  async postLogin() {
    this.resetErrors();
    try {
      const data = { "username" : document.getElementById("user-email").value, "password" : document.getElementById("user-pass").value };
      const response = await axios({
          url: '/api/auth/login',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          data: data
      });
      // console.log(response.result);
      //console.log(data);
      const json = await response.data;
      // console.log('Success:', JSON.stringify(json));
      // console.log(json.user.id);
      localStorage.setItem("token", json.token);
      try {
        const userResponse = await axios({
            url: '/api/auth/user',
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
              'Authorization': 'Token ' + localStorage.getItem("token")
            }
        });
        // console.log(userResponse.data);
        const userJson = await userResponse.data;
        // console.log('Success:', JSON.stringify(userJson));
        this.props.dispatch({ type: "LOGIN", user: userJson, isStartup: json.is_startup });
        this.props.history.push('/');
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      if (error.response.status === 400) {
        document.getElementById('user-pass').style.borderColor = '#ff4444';
        document.getElementById('user-email').style.borderColor = '#ff4444';
        document.getElementById('user-pass').style.backgroundColor = '#ffe6e6';
        document.getElementById('user-email').style.backgroundColor = '#ffe6e6';
        document.getElementById('login-error').style.display = 'block';
      }
      else if (error.response.status === 401) {
        localStorage.removeItem("token");
        this.props.dispatch({ type: "LOGOUT" });
        this.props.history.push('/login');
      } else {
        document.getElementById('server-error').style.display = 'block';
      }
    }
  }

    async registerUser() {
      if(passMatch) {
        this.props.history.push({
          pathname: '/signup',
          state: {
            email: document.getElementById("new-user-email").value,
            password: document.getElementById("new-user-pass").value
          }
        })
      }
    }

  componentDidMount() {
    try {
      if (this.props.location.state.newSignup) {
        document.getElementById('new-signup-error').style.display = 'block';
      }
    } catch (error) {
      
    }
  }

  render () {
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
                <span id="login-error" className="error" style={{ backgroundColor: '#ff4444' }}><FontAwesomeIcon icon={errorIcon} /> &nbsp; Invalid Login Credentials</span>
                <span id="server-error" className="error" style={{ backgroundColor: '#ffbb33' }}><FontAwesomeIcon icon={errorIcon} /> &nbsp; Server Error. Please Try again </span>
                <span id="new-signup-error" className="error" style={{ backgroundColor: '#00C851' }}><FontAwesomeIcon icon={successIcon} /> &nbsp; Account created! Login below </span>
                <form onSubmit={(e) => {e.preventDefault(); this.postLogin()}}>
                  <label className={"text-input-label"} htmlFor="user-email" >Email:</label>
                  <input id="user-email" className={"input-text"}  type="email" autoComplete="username" defaultValue="" required />
                  <label className="text-input-label" htmlFor="user-pass" >Password:</label>
                  <input id="user-pass" className={"input-text"} type="password" autoComplete="current-password" defaultValue="" required />
                  <div id="remember-me-wrapper">
                    {/*}<input type="checkbox" id="remember-me"></input><label htmlFor="remember-me">&nbsp;Keep me logged in</label>{*/}
                    <input type="checkbox" id="show-pass" onClick={showPass} />
                    <label htmlFor="show-pass" id="show-label">
                      <FontAwesomeIcon icon={showIcon} id="show-icon" />
                      <FontAwesomeIcon icon={hideIcon} id="hide-icon" />
                      &nbsp;Show Password
                    </label>
                  </div>
                  <button type="submit" ><FontAwesomeIcon icon={loginIcon} />&nbsp; Login</button>
                </form>
              </Col>
              <Col lg={0.5}>
                <div className="divider"/>
              </Col>
              <Col lg={5.75} id="signup-col">
                <h1>Signup</h1>
                <form onSubmit={(e) => {e.preventDefault(); this.registerUser()}}>
                  <label className="text-input-label" htmlFor="new-user-email" >Account Email:</label>
                  <input id="new-user-email" className="input-text" type="email" required/>
                  <label className="text-input-label" htmlFor="new-user-pass" >Create a Password:<br></br><span style={{fontSize: "14px"}}>(8 or more characters in length containing a number, uppercase and lowercase letter)</span></label>
                  <input id="new-user-pass" className="input-text" type="password" required autoComplete="new-password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Passwords must contain a number, an uppercase letter and a lowercase letter and must be 8 characters long" />
                  <label className="text-input-label" htmlFor="confirm-user-pass" >Confirm Password: <span id="match-confirm-pass" className="error" style={{display: 'none', backgroundColor: '#ff4444', marginTop: '8px'}}><FontAwesomeIcon icon={errorIcon} ></FontAwesomeIcon> &nbsp; Passwords do not match!</span></label>
                  <input id="confirm-user-pass" className="input-text" type="password" required autoComplete="new-password" onChange={this.checkPassMatch} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Passwords must contain a number, an uppercase letter and a lowercase letter and must be 8 characters long" />
                  <div id="remember-me-wrapper">
                    <input type="checkbox" id="show-signup-pass" onClick={showSignupPass}/>
                    <label htmlFor="show-signup-pass" id="show-signup-label">
                      <FontAwesomeIcon icon={showIcon} id="show-signup-icon"/>
                      <FontAwesomeIcon icon={hideIcon} id="hide-signup-icon"/>
                      &nbsp;Show Password
                    </label>
                  </div>
                  <button type="submit"><FontAwesomeIcon icon={signupIcon} />&nbsp; Signup</button>
                </form>
              </Col>
            </Row>
          </Container>
        </>
      )

   }
}

const mapStateToProps = (state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated
});

export default withRouter(connect()(LogIn));
