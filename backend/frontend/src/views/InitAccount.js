import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import * as axios from 'axios';
import Select from 'react-select';
// import { Link } from 'react-router-dom';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt as loginIcon, faUserPlus as signupIcon, faExclamationTriangle as errorIcon } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash as hideIcon, faEye as showIcon } from '@fortawesome/free-regular-svg-icons'


/* ------------------------- */

const Req = () => {
  return <span className="req"></span>
};

var date = new Date();
var minDate = date.getFullYear() - 1;
var maxDate = date.getFullYear() + 9;

var successfulRegister = true;

var passMatch = true;

function printSkills(x) {
  if (x.length < 1) return "";
  var out = x[0] + "";
  var i = 1;
  while (i < x.length) {
    out += ", " + x[i];
    i = i + 1;
  }
  return out;
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

const degreeList = [
  { label: "Bachelors", value: "Bachelors" },
  { label: "Masters", value: "Masters" },
  { label: "Doctorate", value: "Doctorate" },
  { label: "Other", value: "Other" }
];

class InitAccount extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    degree: "",
    email: "",
    password: ""
  }

  componentWillMount() {
    try {
      this.setState({ email : this.props.location.state.email });
      this.setState({ password : this.props.location.state.password });
    } catch (error) {
      console.log("State not set!")
    }
  }

  checkPassMatch() {
    try {
      if (document.getElementById("new-user-pass").value == document.getElementById("confirm-user-pass").value || document.getElementById("confirm-user-pass").value == "") {
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

  async registerUser() {
    try {
      if (this.state.degree == "") throw "badDegree";
      //if (this.state.degree == "") throw "badGradYear";

      const data = { "username" : document.getElementById("new-user-email").value, "email" : document.getElementById("new-user-email").value, "password" : document.getElementById("new-user-pass").value };
      const response = await fetch('api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        }
      });
      console.log(data);
      const json = await response.json();
      console.log('Success:', JSON.stringify(json));
      const userData = {
        "firstName" : document.getElementById("first-name").value,
        "lastName" : document.getElementById("last-name").value,
        "email" : document.getElementById("new-user-email").value,
        "dateOfBirth" : document.getElementById("date-of-birth").value,
        "userMajor" : document.getElementById("major").value,
        "userGPA" : document.getElementById("gpa").value,
        "userDegree" : this.state.degree,
        "userPitch" : document.getElementById("bio").value,
        "extraCurriculars" : document.getElementById("skills").value,
        "userBookmarks" : ""
      };
      const userResponse = await fetch('api/users/', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'content-type': 'application/json'
        }
      });
      console.log(userData);
      const userJson = await userResponse.json();
      console.log('Success:', JSON.stringify(userJson));
      if (successfulRegister) {
        this.props.history.push({
          pathname: '/login',
          state: {
            newSignup: true
          }
        })
      }
    } catch (error) {
      console.error('Error:', error);
      successfulRegister = false;
    }
  }

  addDefaultSrc(ev) {
    ev.target.src = '/img/usr/missing.png';
  }

  handleCategoryChange = (selectedOption) => {
    this.setState({
      ...this.state,
      degree: selectedOption.value
    });
  }

  render () {
      return (
        <>
          <div className="hero">
            <div className="hero-inner">
              <h1>Setup Your Account</h1>
            </div>
          </div>
          <br></br>
          <Container id="init-account">
            <h1>Account Configuration</h1>
            <p><i><Req /> = Required Field</i></p>
              <form onSubmit={(e) => {e.preventDefault(); this.registerUser()}}>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label className="text-input-label" htmlFor="new-user-email" >Account Email<Req />:</label></Col>
                  <Col md={10} sm={12}><input id="new-user-email" defaultValue={this.state.email} className="input-text" type="email" required></input></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label className="text-input-label" htmlFor="new-user-pass" >Create a Password<Req />:<br></br><span style={{fontSize: "14px"}}>(8 or more characters in length containing a number, uppercase and lowercase letter)</span></label></Col>
                  <Col md={10} sm={12}><input id="new-user-pass" className="input-text" defaultValue={this.state.password} type="password" required autoComplete="new-password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Passwords must contain a number, an uppercase letter and a lowercase letter and must be 8 characters long" ></input></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label className="text-input-label" htmlFor="confirm-user-pass" >Confirm Password<Req />: <span id="match-confirm-pass" className="error" style={{display: 'none', backgroundColor: '#ff4444', marginTop: '8px'}}><FontAwesomeIcon icon={errorIcon} ></FontAwesomeIcon> &nbsp; Passwords do not match!</span></label></Col>
                  <Col md={10} sm={12}>
                    <input id="confirm-user-pass" className="input-text" type="password" onChange={this.checkPassMatch} required autoComplete="new-password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Passwords must contain a number, an uppercase letter and a lowercase letter and must be 8 characters long" ></input>
                    <div id="remember-me-wrapper">
                      <input type="checkbox" id="show-signup-pass" onClick={showSignupPass}></input>
                      <label htmlFor="show-signup-pass" id="show-signup-label">
                        <FontAwesomeIcon icon={showIcon} id="show-signup-icon"></FontAwesomeIcon>
                        <FontAwesomeIcon icon={hideIcon} id="hide-signup-icon"></FontAwesomeIcon>
                        &nbsp;Show Password
                      </label>
                    </div>
                  </Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="first-name">First Name<Req />:</label></Col>
                  <Col md={10} sm={12}>
                    <input id="first-name" minLength="1" pattern="[A-Za-z0-9 -]+" title="Only use alphanumeric characters and ' '' and '-'." autoComplete="given-name" maxLength="50" required>
                    </input>
                 </Col>
                </Row>
                <Row className="setting-row">
                   <Col md={2} sm={12}><label htmlFor="last-name">Last Name<Req />:</label></Col>
                   <Col md={10} sm={12}>
                     <input id="last-name" minLength="1" pattern="[A-Za-z0-9 -]+" title="Only use alphanumeric characters and ' '' and '-'." maxLength="50" autoComplete="family-name" required>
                     </input>
                </Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="date-of-birth">Date of Birth<Req />:</label></Col>
                  <Col md={10} sm={12}><input id="date-of-birth" defaultValue="1990-05-05" type="date" autoComplete="bday" required></input></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="bio" >Biography (Describe yourself as a job candidate within 220 characters)<Req />:</label></Col>
                  <Col md={10} sm={12}><textarea id="bio" maxLength="220" required></textarea></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="grad-date" >Graduation Year<Req />:</label></Col>
                  <Col md={10} sm={12}><input id="grad-date" type="number" step="1" min={minDate} max={maxDate} required></input></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="major">Major<Req />:</label></Col>
                  <Col md={10} sm={12}>
                    <input id="major" minLength="1" pattern="[A-Za-z0-9&/-]+" title="Only use alphanumeric characters and '&', '/' and '-'." maxLength="50" required>
                    </input>
                 </Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="major">Degree<Req />:</label></Col>
                  <Col md={10} sm={12}>
                    <Select
                      options={degreeList}
                      className="filter-dropdown"
                      onChange={this.handleCategoryChange}
                      theme={theme => ({
                       ...theme,
                       borderRadius: "8px",
                       colors: {
                         ...theme.colors,
                         primary25: '#eeeeee',
                         primary: '#3d5afe',
                         primary50: '#e8e8e8',
                       },
                      })}>
                    </Select>
                 </Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="gpa" >GPA (Ex 2.00)<Req />:</label></Col>
                  <Col md={10} sm={12}><input id="gpa" type="number" step="0.01" min="0" max="4" required></input></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="skills" >Skills (seperate each with a comma)<Req />:</label></Col>
                  <Col md={10} sm={12}><textarea id="skills" maxLength="220" required></textarea></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="submit-profile">Create Account</label></Col>
                  <Col md={10} sm={12}><button id="submit-profile" type="submit">Create Account</button></Col>
                </Row>
              </form>
          </Container>
        </>
      )
   }
}

const mapStateToProps = (state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated
});

export default withRouter(connect(mapStateToProps)(InitAccount));
