import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import * as axios from 'axios';
import Select from "react-select";
// import { Link } from 'react-router-dom';

// Icons
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStar as favoriteIcon, faEnvelope as emailIcon, faGraduationCap as educationIcon, faFile as resumeIcon, faBook as majorIcon, faTools as skillsIcon } from '@fortawesome/free-solid-svg-icons'
// import { faClock as deadlineIcon } from '@fortawesome/free-regular-svg-icons'

/* ------------------------- */

const industryList = [
  { label: "Accounting/Finance", value: "FIN" },
  { label: "Administrative", value: "ADM" },
  { label: "Biotechnology", value: "BIO" },
  { label: "Chemical/Materials", value: "CHEM" },
  { label: "Data/Analysis", value: "DATA"},
  { label: "Engineering", value: "ENG" },
  { label: "Health/Medicine", value: "MED" },
  { label: "Project Mangement", value: "PM" },
  { label: "Marketing/PR", value: "PR" },
  { label: "Sales/Business", value: "BUS" },
  { label: "Software Development", value: "DEV" },
  { label: "Legal", value: "LAW" },
  { label: "User Experience/Design", value: "UX" },
  { label: "Other", value: "MISC" }
];

var date = new Date();
var minDate = date.getFullYear() - 1;
var maxDate = date.getFullYear() + 9;

class Settings extends Component {
  state = {

  }

  handleUserError() {
    console.error("User Error");
  }

  bounce() {
    this.props.history.push('/login');
  }

  async updateSettings() {
    try {
      const data = {
        "firstName" : document.getElementById("first-name").value,
      }
      const profileResponse = await axios({
          url:' /api/startups/' + this.props.user.id + '/update/',
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
    } catch (error) {
      if (error.response.status === 400) {
        this.handleUserError();
      } else if (error.response.status === 401) {
        this.bounce();
      } else console.error(error);
    }
  }

  async updateProfile() {
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
    } catch (error) {
      if (error.response.status === 400) {
        this.handleUserError();
      } else if (error.response.status === 401) {
        this.bounce();
      }
      else console.error(error);
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
      } else if (!this.props.isStartup) {
        return (
          <Redirect to="/" />
        )
      }

      return (
        <>
          <div className="hero">
            <div className="hero-inner">
              <h1>Your Settings</h1>
            </div>
          </div>
          <br />
          <Container id="user-settings">
            <h1>Company Settings</h1>
              <form onSubmit={(e) => {e.preventDefault(); this.updateSettings()}}>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="org-name" >Company Name:</label></Col>
                  <Col md={10} sm={12}><input id="org-name" defaultValue={this.props.user.orgName} autoComplete="given-name" minLength="1" pattern="[A-Za-z0-9-]+" maxLength="30" title="Enter alphanumeric charcters and hyphens only." /></Col>
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
                  <Col md={2} sm={12}><label htmlFor="desc" >Company Description (220 characters):</label></Col>
                  <Col md={10} sm={12}><textarea id="desc" maxLength="220" defaultValue={this.props.user.orgDesc} /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="desc" >Company Location:</label></Col>
                  <Col md={10} sm={12}><input id="desc" maxLength="32" defaultValue={this.props.user.orgLocation} /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="industry">Industry:</label></Col>
                  <Col md={10} sm={12}>
                    <Select
                        options={industryList}
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
                  <Col md={2} sm={12}><label htmlFor="confirm-password-2">Confirm Password:</label></Col>
                  <Col md={10} sm={12}><input id="confirm-password-2" type="password" autoComplete="current-password" title="Confirm Password to make changes." required /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="submit-profile">Update Settings</label></Col>
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
