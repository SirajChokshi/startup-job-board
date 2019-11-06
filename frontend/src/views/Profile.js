import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';

// Components
import Education from '../components/Education';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as favoriteIcon, faEnvelope as emailIcon, faGraduationCap as educationIcon, faFile as resumeIcon, faBook as majorIcon } from '@fortawesome/free-solid-svg-icons'
import { faClock as deadlineIcon } from '@fortawesome/free-regular-svg-icons'

/* ------------------------- */

var userAuth = true;
var greeting = "Your";

if (userAuth) {

} else {
  greeting = "Somebody's";
}

var profileImage = "";
var studentName = "Siraj Chokshi";
var studentPitch = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
var studentEmail = "sirajchokshi@gmail.com";
var gpa = "4.00";
var gradDate = "2023";
var major = "Psychology";

export default class Profile extends Component {
  state = {
  }

  addDefaultSrc(ev) {
    ev.target.src = '/img/usr/missing.png';
  }

  render () {
      return (
        <>
          <div className="hero">
            <div className="hero-inner">
              <h1>{greeting} Profile</h1>
            </div>
          </div>
          <br></br>
          <Container id="user-profile">
            <Row>
              <Col md={3} xs={4}>
                <img id="user-profile-image" src={profileImage} onError={this.addDefaultSrc} ></img>
              </Col>
              <Col md={9} xs={8} className="user-profile-header">
                <h1>{studentName}</h1>
                <p>{studentPitch}</p>
                <Row id="stats">
                  <Col md={4} sm={6}>
                    <FontAwesomeIcon icon={educationIcon}></FontAwesomeIcon> <strong>Class:</strong>&nbsp; {gradDate}
                    <br></br>
                    <FontAwesomeIcon icon={majorIcon}></FontAwesomeIcon> &nbsp; <strong>Major:</strong>&nbsp; {major}
                  </Col>
                  <Col md={4} sm={6}>
                    <FontAwesomeIcon icon={educationIcon}></FontAwesomeIcon> <strong>Class:</strong>&nbsp; {gradDate}
                    <br></br>
                    <FontAwesomeIcon icon={majorIcon}></FontAwesomeIcon> &nbsp; <strong>Major:</strong>&nbsp; {major}
                  </Col>
                  <Col md={4} sm={12}>
                    <FontAwesomeIcon icon={emailIcon}></FontAwesomeIcon> &nbsp; <a href={"mailto:" + studentEmail}>{studentEmail}</a>
                    <br></br>
                    <FontAwesomeIcon icon={resumeIcon}></FontAwesomeIcon> &nbsp;&nbsp; <Link to="/usr/files/resume.pdf">Resume</Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </>
      )
   }
}
