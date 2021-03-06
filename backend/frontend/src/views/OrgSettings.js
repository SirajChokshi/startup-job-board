import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import * as axios from 'axios';
import Select from "react-select";
import { industryList } from '../static/constants'

/* ------------------------- */

class Settings extends Component {
  state = {

  }

  handleUserError() {
    console.error("User Error");
  }

  bounce() {
    this.props.history.push('/login');
  }

  handleIndustryChange = (selectedOption) => {
    this.setState({
      ...this.state,
      industry: selectedOption.value
    });
//    console.log(this.state.listCategory);
  }

  async updateSettings() {
    try {
      const data = {
        "orgName" : document.getElementById("org-name").value,
        "orgLocation" : document.getElementById("location").value,
        "orgDesc" : document.getElementById("desc").value,
        "orgIndustry" : this.state.industry
      }
      const profileResponse = await axios({
          url:' /api/startups/' + this.props.user.id + '/',
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
                  <Col md={10} sm={12}><input id="org-name" defaultValue={this.props.user.orgName} autoComplete="given-name" minLength="1" maxLength="30" title="Enter alphanumeric charcters and hyphens only." /></Col>
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
                  <Col md={2} sm={12}><label htmlFor="location" >Company Location:</label></Col>
                  <Col md={10} sm={12}><input id="location" maxLength="32" defaultValue={this.props.user.orgLocation} autoComplete="address-level2" /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="industry">Industry:</label></Col>
                  <Col md={10} sm={12}>
                    <Select
                        options={industryList}
                        className="filter-dropdown"
                        onChange={this.handleIndustryChange}
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
                  <Col md={10} sm={12}><button id="submit-profile" type="submit">Update Settings</button></Col>
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
