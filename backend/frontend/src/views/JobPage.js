import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt as appIcon, faMapMarkerAlt as locationIcon, faBriefcase as jobCategoryIcon, faList as Software, faEdit as editIcon } from '@fortawesome/free-solid-svg-icons'
import { faClock as deadlineIcon } from '@fortawesome/free-regular-svg-icons'

import { categoryList } from '../static/constants'

// Components

function getLabelFromValue(value) {
  for (const key of Object.keys(categoryList)) {
      if (categoryList[key].value === value) {
        return categoryList[key].label;
      }
  }
}

class JobPage extends Component {
  state = {
    listing: [],
    company: []
  }

  componentDidMount() {
      console.log(this.props.listingID);
      fetch('/api/listings/' + this.props.listingID + '/')
          .then(res => res.json())
          .then((data) => {
              this.setState({ listing: data })
              // console.log(this.state.listing.listLongDesc)
          })
          .then(() => {
              fetch('/api/startups/' + this.state.listing.listOrgID + '/?format=json', {
                  method: 'GET',
                  headers: {
                      'Accept': 'application/json',
                      'content-type': 'application/json',
                      'Authorization': 'Token ' + localStorage.getItem("token")
                  }
              })
                  .then(res => res.json())
                  .then((data) => {
                      this.setState({ company: data })
                  })
                  .catch(console.log)
            })
          .catch(
              console.log
          )
    }

  addDefaultSrc(ev) {
    ev.target.src = '/img/org/missing.png';
  }

  render () {
      if (!this.props.isAuthenticated) {
        return (
          <Redirect to="/login" />
        )
      }
      return (
        <span>
          <div className="hero">
            <div className="hero-inner">
              <span className="sub-title">
                  <Link to="/jobs">&larr; Back to Job Search</Link>
              </span>
            </div>
          </div>
          <br></br>
          <Container>
            <article className="job">
              <Row>
                <Col md={8}>
                  <h1>{this.state.listing.listName}</h1>
                  <p id="industry">
                    <FontAwesomeIcon icon={jobCategoryIcon} /> &nbsp; {getLabelFromValue(this.state.listing.listCategory)} &nbsp;
                    &mdash; &nbsp;<FontAwesomeIcon icon={locationIcon} /> &nbsp; {this.state.listing.listLocation} &nbsp;
                    &mdash; &nbsp;<FontAwesomeIcon icon={deadlineIcon} /> &nbsp; February, 8th 2019
                  </p>
                </Col>
                <Col md={4} id="top-apply-button" >
                  <div className="button-wrapper" style={{marginTop: "15px", textAlign: "right"}}>
                    { this.props.isStartup ?
                      (
                        <Link className="button" to={"/my-listings/edit/" + this.props.listingID} >
                          Edit
                          &nbsp; <FontAwesomeIcon icon={editIcon} />
                        </Link>
                      ) : (
                        <Link className="button" >
                          Apply <span className="hide-ext">Externally </span>&nbsp; <FontAwesomeIcon icon={appIcon} />
                        </Link>
                      )}
                  </div>
                </Col>
              </Row>
              <h2>About This Position</h2>
              <p id="job-desc" style={{whiteSpace: "pre-line"}}>{this.state.listing.listLongDesc}</p>
              <div className="button-wrapper">
                { this.props.isStartup && this.state.company.id === this.props.user.id ?
                (
                  <Link className="button" to={"/my-listings/edit/" + this.props.listingID} >
                    Edit
                    &nbsp; <FontAwesomeIcon icon={editIcon} />
                  </Link>
                ) : (
                  <Link className="button">Apply <span className="hide-ext">Externally </span>&nbsp; <FontAwesomeIcon icon={appIcon} /></Link>
                )}
              </div>
              <br />
              <hr />
              <br />
              <Row className="company-profile">
                <Col md={2} xs={3}><Link className="image-wrapper" to={"/org/" + this.state.company.id}><img onError={this.addDefaultSrc} src={"/img/org/" + this.state.company.id + ".png"} alt={this.state.company.orgName} /></Link></Col>
                <Col md={10} xs={9}>
                  <Link to={this.props.jobPage}><h2 style={{display: "inline"}}>{this.state.company.orgName} <span className="hide-pipe">|</span></h2> <p id="company-industry"><FontAwesomeIcon style={{fontSize: "14px"}} icon={Software} /> &nbsp;{getLabelFromValue(this.state.company.orgIndustry)}</p></Link>
                  <p className="sub-title">

                  </p>
                  <p>
                    {this.state.company.orgDesc}
                  </p>
                  <div className="button-wrapper">
                    <Link to={"/org/" + (this.state.listing.listOrgID)} className="button">
                      {this.props.isStartup ? (<>My Profile</>) : (<><span id="hide-full-company-button">Other positions from </span>{this.state.company.orgName}</>)}
                       &nbsp; <FontAwesomeIcon icon={appIcon} /></Link>
                  </div>
                </Col>
              </Row>
              <div className="shadow" />
            </article>
          </Container>
        </span>
      )
   }
}


const mapStateToProps = (state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  isStartup: state.isStartup
});

export default withRouter(connect(mapStateToProps)(JobPage));
