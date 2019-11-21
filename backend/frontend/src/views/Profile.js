import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as axios from 'axios'

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as favoriteIcon, faEnvelope as emailIcon, faGraduationCap as educationIcon, faFile as resumeIcon, faBook as majorIcon, faTools as skillsIcon, faAward as gradeIcon, faPlusCircle as addIcon } from '@fortawesome/free-solid-svg-icons'
import { faClock as deadlineIcon } from '@fortawesome/free-regular-svg-icons'

/* ------------------------- */

var profileImage, studentName, studentEmail, studentPitch, gpa, gradDate, major, skills, greeting, degree = "";
var loggedInID;
var sameUser = false;

const addListingStyles = {
    width: "100%",
    backgroundColor: "#FFFFFF",
    position: "relative",
    padding: "20px",
    display: "block",
    borderRadius: "12px",
    height: "auto",
    boxSizing: "border-box",
    color: "#3d5afe",
    textDecoration: 'none',
    fontSize: "20px",
    marginBottom: "20px"
};

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
      greeting = user.firstName + "'s";
      profileImage = "/dff.g";
      studentName = user.firstName + " " + user.lastName;
      studentEmail = user.email;
      gpa = user.userGPA;
      degree = user.userDegree;
      gradDate = user.userGradYear;
      major = user.userMajor;
      studentPitch = user.userPitch;
      skills= user.extraCurriculars;
    } catch (error) {
      console.error('USER RETRIEVAL ERROR');
    }
  }

  async componentDidMount() {
    profileImage = studentName = studentEmail = studentPitch = gpa = gradDate = major = skills = greeting = degree = "";
    this.tryForUser(this.props.userID);
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
            { sameUser &&
              (<Link id="new-listing-button" style={addListingStyles} to="/user-settings/">
                <FontAwesomeIcon icon={addIcon}/>
                 &nbsp; Edit your profile
                 <div className="shadow" />
              </Link>)
            }
            <Row>
              <Col md={3} xs={4}>
                <img id="user-profile-image" src={profileImage} onError={this.addDefaultSrc} />
              </Col>
              <Col md={9} xs={8} className="user-profile-header">
                <h1>{studentName}</h1>
                <p>{studentPitch}</p>
                <Row id="stats">
                  <Col md={4} sm={12}>
                    <FontAwesomeIcon icon={educationIcon} /> &nbsp;<strong>Class:</strong>&nbsp; {degree}, {gradDate}
                    <br></br>
                    &nbsp;<FontAwesomeIcon icon={majorIcon} /> &nbsp; <strong>Major:</strong>&nbsp; {major}
                    <br></br>
                    &nbsp;<FontAwesomeIcon icon={gradeIcon} /> &nbsp; <strong>GPA:</strong>&nbsp; {parseFloat(gpa).toFixed(2)}
                  </Col>
                  <Col md={4} sm={12}>
                    <FontAwesomeIcon icon={emailIcon} /> &nbsp; <a href={"mailto:" + studentEmail}>{studentEmail}</a>
                    <br></br>
                    <FontAwesomeIcon icon={resumeIcon} /> &nbsp;&nbsp; <Link to="/usr/files/resume.pdf">Resume</Link>
                  </Col>
                  <Col md={4} sm={12}>
                    <FontAwesomeIcon icon={skillsIcon} /> &nbsp; <strong>Skills:</strong>&nbsp; {skills}
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
  isAuthenticated: state.isAuthenticated,
  isStartup: state.isStartup
});

export default withRouter(connect(mapStateToProps)(Profile));
