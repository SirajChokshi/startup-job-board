import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import * as axios from 'axios';
import Select from 'react-select';
import { Redirect, withRouter } from 'react-router-dom';
import {connect} from "react-redux";

/* ------------------------- */

var d = new Date();
var minDate  = d.getFullYear() + "-" + d.getMonth() + "-" + ('0' + (d.getDay())).slice(-2);
var maxDate  = (d.getFullYear() + 1) + "-" + d.getMonth() + "-" + ('0' + (d.getDay())).slice(-2);

const categoryList = [
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

class EditListing extends Component {
  state = {
    listCategory: "",
    listing: []
  }

  UNSAFE_componentWillMount() {
    fetch('/api/listings/' + this.props.listingID + '/?format=json', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      }
    })
        .then(res => res.json())
        .then((data) => {
          this.setState({ listing: data })
        })
        .catch(console.log)
    /* Get this listing */
  }

  async updateListing() {
    try {
      const data = {
        "listName" : document.getElementById("listing-title").value,
        "listDesc" : document.getElementById("short-desc").value,
        "listLongDesc" : document.getElementById("long-desc").value,
        "listDeadline" : document.getElementById("deadline").value,
        "listLocation" : document.getElementById("location").value,
        "externalLink" : document.getElementById("app-url").value,
        "listCategory": this.state.listCategory
      };
      const response = await axios({
          url: '/api/listings/' + this.props.listingID + '/update/',
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Token ' + localStorage.getItem("token")
          },
          data: data
      });
      console.log(response.result);
      //console.log(data);
      const json = await response.data;
      console.log('Success:', JSON.stringify(json));
    } catch (error) {
//      console.clear();
      if (error.response.status === 400) {
        console.error(error)
      }
      else if (error.response.status === 401) {
        this.props.history.push({
          pathname: '/login',
        })
      }
      else if (error.response.status === 403) {
        if (this.props.isStartup) {
          this.props.history.push({
            pathname: '/my-listings',
          })
        }
        else {
          this.props.history.push({
            pathname: '/',
          })
        }
      }
      else console.error('NOT 400: OTHER ERROR')
    }
  }

  handleCategoryChange = (selectedOption) => {
    this.setState({
      ...this.state,
      listCategory: selectedOption.value
    });
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
              <h1>Edit your listing</h1>
            </div>
          </div>
          <br/>

          <Container id="user-settings">
            <h1>Listing Information</h1>
              <form  onSubmit={(e) => {e.preventDefault(); this.updateListing()}}>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="listing-title" >Position Title:</label></Col>
                  <Col md={10} sm={12}><input id="listing-title" defaultValue={this.state.listing.listName} placeholder="Ex. Public Relations Intern" autoComplete="organization-title" minLength="3" maxLength="50" title="Enter alphanumeric charcters and hyphens only." /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="short-desc" >Short Description (160 characters):</label></Col>
                  <Col md={10} sm={12}><textarea id="short-desc" defaultValue={this.state.listing.listDesc} maxLength="160" placeholder="" required /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="app-url" >Application URL (HTTP or mailto address):</label></Col>
                  <Col md={10} sm={12}><input id="app-url" defaultValue={this.state.listing.externalLink} placeholder="Ex. https://mycompany.com/jobs?id=0, mailto:jobs@company.com" type="url" required /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="category">Job Category:</label></Col>
                  <Col md={10} sm={12}>
                    <Select
                      options={categoryList}
                      className="filter-dropdown"
                      onChange={this.handleCategoryChange}
                      defaultValue={this.state.listing.listCategory}
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
                  <Col md={2} sm={12}><label htmlFor="location">Location:</label></Col>
                  <Col md={10} sm={12}><input id="location" defaultValue={this.state.listing.listLocation} placeholder="Ex. Champaign, IL" autoComplete="" minLength="1" maxLength="50" title="Enter alphanumeric charcters, hyphens and spaces only." required /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="deadline">Deadline:</label></Col>
                  <Col md={10} sm={12}><input id="deadline" defaultValue={this.state.listing.listDeadline} min={minDate} max={maxDate} type="date" required /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="long-desc" >Full Description:</label></Col>
                  <Col md={10} sm={12}><textarea id="long-desc" defaultValue={this.state.listing.listLongDesc} minLength="100" maxLength="7500" required /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="create-listing">Update Listing:</label></Col>
                  <Col md={10} sm={12}><button id="create-listing" type="submit">Update Listing</button></Col>
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

export default withRouter(connect(mapStateToProps)(EditListing));
