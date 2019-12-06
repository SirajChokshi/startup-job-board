import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList as Software } from '@fortawesome/free-solid-svg-icons'

// Components
import Feed from '../components/Feed';

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

function getLabelFromValue(value) {
    for (const key of Object.keys(industryList)) {
        if (industryList[key].value === value) {
            return industryList[key].label;
        }
    }
}

class OrgProfile extends Component {
  state = {
    listings: [],
    company: []
  }

    componentDidMount() {
        fetch('/api/startups/' + this.props.listingID + '/?format=json', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({ company: data })
            })
            .catch(console.log);
        fetch('/api/listings/' + this.props.listingID +'/')
            .then(res => res.json())
            .then((data) => {
                this.setState({ listing: data })
            })
            .catch(console.log)
      fetch('/api/listings/?format=json&listOrgID=' + this.props.listingID)
      .then(res => res.json())
      .then((data) => {
        this.setState({ listings: data })
      })
      .catch(console.log)
    }

  addDefaultSrc(ev) {
    ev.target.src = '/img/org/missing.png';
  }

  render () {
      return (
        <span>
          <div className="hero">
            <div className="hero-inner">
              <span className="sub-title">
                  { this.props.isStartup ? (
                          <><Link to="/my-listings">My Listings</Link> &nbsp;|&nbsp; <Link to="/recruit"> Recruit a student</Link></>) :
                      (
                          <Link to="/jobs">&larr; Back to Job Search</Link>
                      )
                  }
              </span>
            </div>
          </div>
          <br />
          <Container>
            <article className="job">
              <Row className="company-profile">
                <Col md={2} xs={3}><span className="image-wrapper" ><img onError={this.addDefaultSrc} src={"/img/org/" + this.state.company.id + ".png"} alt={this.props.company} /></span></Col>
                <Col md={10} xs={9}>
                  <Link to={this.props.jobPage}><h2 style={{display: "inline"}}>{this.state.company.orgName}</h2></Link><br />
                  <p id="company-industry"><FontAwesomeIcon style={{fontSize: "14px"}} icon={Software} /> &nbsp;{getLabelFromValue(this.state.company.orgIndustry)}</p>
                  <p className="sub-title">

                  </p>
                  <p>
                    {this.state.company.orgDesc}
                  </p>
                </Col>
              </Row>
              <div className="shadow" />
            </article>
            <h2>Positions posted by {this.state.company.orgName}:</h2>
            <Feed listings={this.state.listings} />
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

export default connect(mapStateToProps)(OrgProfile);