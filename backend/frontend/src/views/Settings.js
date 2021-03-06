import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import * as axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle as errorIcon, faCheckCircle as successIcon } from "@fortawesome/free-solid-svg-icons";

/* ------------------------- */

const date = new Date();
const minDate = date.getFullYear() - 1;
const maxDate = date.getFullYear() + 9;

class Settings extends Component {
  state = {

  };

  resetErrors() {
    document.getElementById('confirm-password-1').style.borderColor = '';
    document.getElementById('confirm-password-1').style.backgroundColor = 'inherit';
    document.getElementById('confirm-password-2').style.borderColor = '';
    document.getElementById('confirm-password-2').style.backgroundColor = 'inherit';
    const errorBlocks = document.getElementsByClassName("error");
    for (let i = 0; i < errorBlocks.length; ++i) {
      errorBlocks[i].style.display = 'none';
    }
  }

  handleUserError() {
    console.error("User Error");
  }

  bounce() {
    this.props.history.push('/login');
  }

  runResponse(x) {
    if (x === 1) {
      document.getElementById('confirm-password-1').style.borderColor = '#ff4444';
      document.getElementById('confirm-password-1').style.backgroundColor = '#ffe6e6';
      document.getElementById('update-settings-error').style.display = 'block';
    } else if (x === 2) {
      document.getElementById('confirm-password-2').style.borderColor = '#ff4444';
      document.getElementById('confirm-password-2').style.backgroundColor = '#ffe6e6';
      document.getElementById('update-profile-error').style.display = 'block';
    }
    else if (x === 3) {
      document.getElementById('update-settings-success').style.display = 'block';
    }
    else if (x === 4) {
      document.getElementById('update-profile-success').style.display = 'block';
    }
  }

  async updateSettings() {
    this.resetErrors();
    try {
      const response = await axios({
        url: '/api/authusers/confirm/',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': 'Token ' + localStorage.getItem("token")
        },
        data: { "password" : document.getElementById("confirm-password-1").value }
      });
      const json = await response.data;
      if (json.isValid) {
        try {
          const data = {
            "firstName" : document.getElementById("first-name").value,
            "lastName" : document.getElementById("last-name").value
          }
          const profileResponse = await axios({
            url:' /api/users/' + this.props.user.id + '/update/',
            method: 'PATCH',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
              'Authorization': 'Token ' + localStorage.getItem("token")
            },
            data: data
          });
          const userJson = await profileResponse.data;
          this.props.dispatch({ type: "UPDATEUSER", user: userJson });
          this.runResponse(3);
        } catch (error) {
          if (error.response.status === 400) {
            this.handleUserError();
          } else if (error.response.status === 401) {
            this.bounce();
          } else console.error(error);
        }
      } else {
        this.runResponse(1);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async updateProfile() {
    this.resetErrors();
    try {
      const response = await axios({
        url: '/api/authusers/confirm/',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': 'Token ' + localStorage.getItem("token")
        },
        data: { "password" : document.getElementById("confirm-password-2").value }
      });
      const json = await response.data;
      if (json.isValid) {
        try {
          const data = {
            "userPitch" : document.getElementById("bio").value,
            "userMajor" : document.getElementById("major").value,
            "userGPA" : document.getElementById("gpa").value,
            "userGradYear" : document.getElementById("grad-date").value
          }
          const profileResponse = await axios({
            url:' /api/users/' + this.props.user.id + '/update/',
            method: 'PATCH',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
              'Authorization': 'Token ' + localStorage.getItem("token")
            },
            data: data
          });
          // console.log(profileResponse.data);
          const userJson = await profileResponse.data;
          // console.log('Success:', JSON.stringify(userJson));
          this.props.dispatch({ type: "UPDATEUSER", user: userJson });
          this.runResponse(4);
        } catch (error) {
          if (error.response.status === 400) {
            this.handleUserError();
          } else if (error.response.status === 401) {
            this.bounce();
          }
          else console.error(error);
        }
      } else {
        this.runResponse(2);
      }
    } catch (error) {
      console.error(error);
    }
  }

  addDefaultSrc(ev) {
    ev.target.src = '/img/usr/missing.png';
  }

  render () {
      if (!this.props.isAuthenticated) {
        return (
          <Redirect to="/login" />
        )
      } else if (this.props.isStartup) {
        return (
          <Redirect to="/org-settings" />
        )
      }
      else return (
        <>
          <div className="hero">
            <div className="hero-inner">
              <h1>Your Settings</h1>
            </div>
          </div>
          <br />
          <Container id="user-settings">
            <h1>Account Settings</h1>
            <span id="update-settings-error" className="error" style={{ backgroundColor: '#ff4444' }}><FontAwesomeIcon icon={errorIcon} /> &nbsp; Invalid Credentials</span>
            <span id="update-settings-success" className="error" style={{ backgroundColor: '#00C851' }}><FontAwesomeIcon icon={successIcon} /> &nbsp; Successful Updated Settings</span>
            <form onSubmit={(e) => {e.preventDefault(); this.updateSettings()}}>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="first-name" >First Name:</label></Col>
                  <Col md={10} sm={12}><input id="first-name" defaultValue={this.props.user.firstName} autoComplete="given-name" minLength="1" pattern="[A-Za-z0-9-]+" maxLength="30" title="Enter alphanumeric charcters and hyphens only." /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="last-name">Last Name:</label></Col>
                  <Col md={10} sm={12}><input id="last-name" defaultValue={this.props.user.lastName} autoComplete="family-name" minLength="1" pattern="[A-Za-z0-9- ]+" maxLength="50" title="Enter alphanumeric charcters, hyphens and spaces only."/></Col>
                </Row>
              {/*}
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="new-email" >Update Email:</label></Col>
                  <Col md={10} sm={12}><input id="new-email" type="email" ></input></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="confirm-email" type="email">Confirm Email:</label></Col>
                  <Col md={10} sm={12}><input id="confirm-email" type="email" ></input></Col>
                </Row>
              {*/}
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="confirm-password-1">Confirm Password:</label></Col>
                  <Col md={10} sm={12}><input id="confirm-password-1" type="password" autoComplete="current-password" title="Confirm Password to make changes." required /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="submit-settings">Submit Changes</label></Col>
                  <Col md={10} sm={12}><button id="submit-settings" type="submit">Submit Changes</button></Col>
                </Row>
              </form>
            <hr />
            <h1>Profile Settings</h1>
            <span id="update-profile-error" className="error" style={{ backgroundColor: '#ff4444' }}><FontAwesomeIcon icon={errorIcon} /> &nbsp; Invalid Credentials</span>
            <span id="update-profile-success" className="error" style={{ backgroundColor: '#00C851' }}><FontAwesomeIcon icon={successIcon} /> &nbsp; Successful Updated Profile</span>
            <form onSubmit={(e) => {e.preventDefault(); this.updateProfile()}}>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="bio" >Biography (220 characters):</label></Col>
                  <Col md={10} sm={12}><textarea id="bio" maxLength="220" defaultValue={this.props.user.userPitch} /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="grad-date" >Graduation Year:</label></Col>
                  <Col md={10} sm={12}><input id="grad-date" type="number" defaultValue={this.props.user.userGradYear} step="1" min={minDate} max={maxDate} /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="major">Major:</label></Col>
                  <Col md={10} sm={12}>
                    <input id="major" defaultValue={this.props.user.userMajor} minLength="1" pattern="[A-Za-z0-9&/ -]+" title="Only use alphanumeric characters and '&', '/' and '-'." maxLength="50">
                    </input>
                 </Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="gpa" >GPA (Out of 4.00):</label></Col>
                  <Col md={10} sm={12}><input id="gpa" defaultValue={parseFloat(this.props.user.userGPA).toFixed(2)} type="number" step="0.01" min="0" max="4" /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="skills" >Skills (seperate each with a comma):</label></Col>
                  <Col md={10} sm={12}><textarea id="skills" maxLength="220" defaultValue={this.props.user.extraCurriculars} /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="confirm-password-2">Confirm Password:</label></Col>
                  <Col md={10} sm={12}><input id="confirm-password-2" type="password" autoComplete="current-password" title="Confirm Password to make changes." required /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="submit-profile">Update Profile</label></Col>
                  <Col md={10} sm={12}><button id="submit-profile" type="submit">Update Profile</button></Col>
                </Row>
              </form>
              <hr />
              <h1>Upload/Change Avatar</h1>
              <form>
                  <Row className="setting-row">
                    <Col md={2} sm={12}><label htmlFor="avatar" >
                      Upload A Square PNG:</label>
                    </Col>
                    <Col md={10} sm={12}>
                      <input id="avatar" type="file" name="pic" accept=".png" />
                    </Col>
                  </Row>
                  <Row className="setting-row">
                    <Col md={2} sm={12}><label htmlFor="submit-avatar">Update Avatar</label></Col>
                    <Col md={10} sm={12}><button id="submit-avatar" type="submit">Update Avatar</button></Col>
                  </Row>
                </form>
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

export default withRouter(connect(mapStateToProps)(Settings));
