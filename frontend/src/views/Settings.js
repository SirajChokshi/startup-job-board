import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';

// Components
import * as EmailValidator from "email-validator";
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as favoriteIcon, faEnvelope as emailIcon, faGraduationCap as educationIcon, faFile as resumeIcon, faBook as majorIcon, faTools as skillsIcon } from '@fortawesome/free-solid-svg-icons'
import { faClock as deadlineIcon } from '@fortawesome/free-regular-svg-icons'

/* ------------------------- */

var profileImage = "";
var firstName = "Siraj";
var lastName = "Chokshi"
var studentPitch = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
var studentEmail = "sirajchokshi@gmail.com";
var gpa = 3;
var gradDate = 2023;
var major = "Psychology";
var skills = "Web Development, Illustrator, Photoshop, CSS, JavaScript, C#, User Interface, User Experience, Graphic Design";
var date = new Date();
var minDate = date.getFullYear() - 1;
var maxDate = date.getFullYear() + 9;

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

export default class Settings extends Component {
  state = {
    usr: []
  }

  addDefaultSrc(ev) {
    ev.target.src = '/img/usr/missing.png';
  }

  render () {
      return (
        <>
          <div className="hero">
            <div className="hero-inner">
              <h1>Your Settings</h1>
            </div>
          </div>
          <br></br>
          <Container id="user-settings">
            <h1>Account Settings</h1>
              <form>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="first-name" >First Name:</label></Col>
                  <Col md={10} sm={12}><input id="first-name" defaultValue={firstName} autoComplete="given-name" minLength="1" pattern="[A-Za-z0-9-]+" maxLength="30" title="Enter alphanumeric charcters and hyphens only." ></input></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="last-name">Last Name:</label></Col>
                  <Col md={10} sm={12}><input id="last-name" defaultValue={lastName} autoComplete="family-name" minLength="1" pattern="[A-Za-z0-9- ]+" maxLength="50" title="Enter alphanumeric charcters, hyphens and spaces only." ></input></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="new-email" >Update Email:</label></Col>
                  <Col md={10} sm={12}><input id="new-email" type="email" ></input></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="confirm-email" type="email">Confirm Email:</label></Col>
                  <Col md={10} sm={12}><input id="confirm-email" type="email" ></input></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="confirm-password">Confirm Password:</label></Col>
                  <Col md={10} sm={12}><input id="confirm-password" type="password" autoComplete="current-password" title="Confirm Password to make changes." required></input></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="submit">Submit Changes</label></Col>
                  <Col md={10} sm={12}><button id="submit" type="submit">Submit Changes</button></Col>
                </Row>
              </form>
            <hr></hr>
            <h1>Profile Settings</h1>
              <form>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="grad-date" >Graduation Year:</label></Col>
                  <Col md={10} sm={12}><input id="grad-date" type="number" defaultValue={gradDate} step="1" min={minDate} max={maxDate} ></input></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="major">Major:</label></Col>
                  <Col md={10} sm={12}>
                    <input id="major" defaultValue={major} minLength="1" pattern="[A-Za-z0-9&/-]+" title="Only use alphanumeric characters and '&', '/' and '-'." maxLength="50">
                    </input>
                 </Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="gpa" >GPA (in #.## format):</label></Col>
                  <Col md={10} sm={12}><input id="gpa" defaultValue={parseFloat(gpa).toFixed(2)} type="number" step="0.01" min="0" max="4" ></input></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="skills" >Skills (seperate each with a comma):</label></Col>
                  <Col md={10} sm={12}><textarea id="skills" contentEditable="true" maxLength="220" >{skills}</textarea></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="confirm-password">Confirm Password:</label></Col>
                  <Col md={10} sm={12}><input id="confirm-password" type="password" autoComplete="current-password" title="Confirm Password to make changes." required></input></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="submit">Update Profile</label></Col>
                  <Col md={10} sm={12}><button id="submit" type="submit">Update Profile</button></Col>
                </Row>
              </form>
              <hr></hr>
              <h1>Upload/Change Avatar</h1>
                <form>
                  <Row className="setting-row">
                    <Col md={2} sm={12}><label htmlFor="avatar" >
                      Upload A Square PNG:</label>
                    </Col>
                    <Col md={10} sm={12}><input id="avatar" type="file" name="pic" accept=".png" ></input></Col>
                  </Row>
                  <Row className="setting-row">
                    <Col md={2} sm={12}><label htmlFor="submit">Update Avatar</label></Col>
                    <Col md={10} sm={12}><button id="submit" type="submit">Update Avatar</button></Col>
                  </Row>
                </form>
          </Container>
        </>
      )
   }
}
