import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as axios from 'axios'

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as favoriteIcon, faEnvelope as emailIcon, faGraduationCap as educationIcon, faFile as resumeIcon, faBook as majorIcon, faTools as skillsIcon } from '@fortawesome/free-solid-svg-icons'
import { faClock as deadlineIcon } from '@fortawesome/free-regular-svg-icons'

/* ------------------------- */

var profileImage, studentName, studentEmail, studentPitch, gpa, gradDate, major, skills, greeting = "";
var loggedInID;

// function printSkills(x) {
//   if (x.length < 1) return "";
//   var out = x[0] + "";
//   var i = 1;
//   while (i < x.length) {
//     out += ", " + x[i];
//     i = i + 1;
//   }
//   return out;
// }

class Profile extends Component {
  state = {
  }

  addDefaultSrc(ev) {
    ev.target.src = '/img/usr/missing.png';
  }

  async tryForUser(id) {
    try {
      const userResponse = await axios({
          url: '/api/users/' + id + '/',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Token ' + localStorage.getItem("token")
          }
      });
      // console.log(userResponse.data);
      const user = await userResponse.data;
      greeting = user.firstName + "\'s";
      profileImage = "/dff.g";
      studentName = user.firstName + " " + user.lastName;
      studentEmail = user.email;
      gpa = user.userGPA;
      gradDate = user.userDegree;
      major = user.userMajor;
      studentPitch = user.userPitch;
      skills= user.extraCurriculars;
    } catch (error) {
      console.error('USER RETRIEVAL ERROR');
    }
  }

  componentWillMount() {
    try {
      loggedInID = this.props.user.id;
    } catch (error) {
      loggedInID = -1;
    }
    if (this.props.userID == loggedInID) {
      greeting = "Your";
      profileImage = "/img/" + loggedInID + ".png";
      studentName = this.props.user.firstName + " " + this.props.user.lastName;
      studentEmail = this.props.user.email;
      gpa = this.props.user.userGPA;
      gradDate = this.props.user.userDegree;
      major = this.props.user.userMajor;
      studentPitch = this.props.user.userPitch;
      skills = this.props.user.extraCurriculars;
    }
    else {
      this.tryForUser(this.props.userID);
    }
  }

  render () {
      if (!this.props.isAuthenticated) {
        return (
          <Redirect to="/login" />
        )
      }

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
                  <Col md={4} sm={12}>
                    <FontAwesomeIcon icon={educationIcon}></FontAwesomeIcon> <strong>Class:</strong>&nbsp; {gradDate}
                    <br></br>
                    <FontAwesomeIcon icon={majorIcon}></FontAwesomeIcon> &nbsp; <strong>Major/GPA:</strong>&nbsp; {major + " / " + parseFloat(gpa).toFixed(2)}
                  </Col>
                  <Col md={4} sm={12}>
                    <FontAwesomeIcon icon={emailIcon}></FontAwesomeIcon> &nbsp; <a href={"mailto:" + studentEmail}>{studentEmail}</a>
                    <br></br>
                    <FontAwesomeIcon icon={resumeIcon}></FontAwesomeIcon> &nbsp;&nbsp; <Link to="/usr/files/resume.pdf">Resume</Link>
                  </Col>
                  <Col md={4} sm={12}>
                    <FontAwesomeIcon icon={skillsIcon}></FontAwesomeIcon> &nbsp; <strong>Skills:</strong>&nbsp; {skills}
                  </Col>
                </Row>
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

export default withRouter(connect(mapStateToProps)(Profile));
