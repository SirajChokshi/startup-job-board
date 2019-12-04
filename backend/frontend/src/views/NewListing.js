import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import * as axios from 'axios';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';

// Icons
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStar as favoriteIcon, faEnvelope as emailIcon, faGraduationCap as educationIcon, faFile as resumeIcon, faBook as majorIcon, faTools as skillsIcon } from '@fortawesome/free-solid-svg-icons'
// import { faClock as deadlineIcon } from '@fortawesome/free-regular-svg-icons'

/* ------------------------- */

const Req = () => {
  return <span className="req"></span>
};

// var profileImage = "";
// var firstName = "Siraj";
// var lastName = "Chokshi"
// var studentPitch = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
// var studentEmail = "sirajchokshi@gmail.com";
// var gpa = 3;
// var gradDate = 2023;
// var major = "Psychology";
// var skills = "Web Development, Illustrator, Photoshop, CSS, JavaScript, C#, User Interface, User Experience, Graphic Design";
// var date = new Date();

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

class NewListing extends Component {
  state = {
    listCategory: ""
  }

  async postListing() {
    try {
      const data = {
        "listName" : document.getElementById("listing-title").value,
        "listDesc" : document.getElementById("short-desc").value,
        "listLongDesc" : document.getElementById("long-desc").value,
        "listLocation" : document.getElementById("location").value,
        "listDeadline" : document.getElementById("deadline").value,
        "externalLink" : document.getElementById("app-url").value,
        "listCategory": this.state.listCategory,
        "isOpen": true,
        "isPaid": true
      };
      const response = await axios({
          url: '/api/listings/manage/add/',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Token ' + localStorage.getItem("token")
          },
          data: data
      });
      // console.log(response.result);
      //console.log(data);
      const json = await response.data;
      console.log('Success:', JSON.stringify(json));
      this.props.history.push({
        pathname: '/my-listings',
        state: {
          newListing: true
        }
      })
    } catch (error) {
//      console.clear();
//       if (error.response.status === 400) {
//         console.error(error)
//       }
//       else console.error('NOT 400: OTHER ERROR')
      console.error(error);
    }
  }

  handleCategoryChange = (selectedOption) => {
    this.setState({
      ...this.state,
      listCategory: selectedOption.value
    });
  }

  render () {
      return (
        <>
          <div className="hero">
            <div className="hero-inner">
              <h1>Create a new listing</h1>
            </div>
          </div>
          <br />

          <Container id="user-settings">
            <h1>Listing Information</h1>
            <p><i><Req /> = Required Field</i></p>
              <form  onSubmit={(e) => {e.preventDefault(); this.postListing()}}>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="listing-title" >Position Title<Req />:</label></Col>
                  <Col md={10} sm={12}><input id="listing-title" placeholder="Ex. Public Relations Intern" autoComplete="organization-title" minLength="3" maxLength="50" title="Enter alphanumeric charcters and hyphens only." /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="short-desc" >Short Description (160 characters)<Req />:</label></Col>
                  <Col md={10} sm={12}><textarea id="short-desc" maxLength="160" placeholder="" required /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="app-url" >Application URL<Req />:</label></Col>
                  <Col md={10} sm={12}><input id="app-url" placeholder="Ex. https://mycompany.com/jobs?id=0" type="url" required /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="category">Job Category<Req />:</label></Col>
                  <Col md={10} sm={12}>
                    <Select
                      options={categoryList}
                      className="filter-dropdown"
                      onChange={this.handleCategoryChange}
                      defaultValue={categoryList[13]}
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
                  <Col md={2} sm={12}><label htmlFor="location">Location<Req />:</label></Col>
                  <Col md={10} sm={12}><input id="location" placeholder="Ex. Champaign, IL" autoComplete="" minLength="1" maxLength="50" title="Enter alphanumeric charcters, hyphens and spaces only." required /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="deadline">Deadline<Req />:</label></Col>
                  <Col md={10} sm={12}><input id="deadline" min={minDate} max={maxDate} type="date" required /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="long-desc" >Full Description<Req />:</label></Col>
                  <Col md={10} sm={12}><textarea id="long-desc" minLength="100" maxLength="7500" required /></Col>
                </Row>
                <Row className="setting-row">
                  <Col md={2} sm={12}><label htmlFor="create-listing">Create Listing:</label></Col>
                  <Col md={10} sm={12}><button id="create-listing" type="submit">Create Listing</button></Col>
                </Row>
              </form>
          </Container>
        </>
      )
   }
}

export default withRouter(NewListing);