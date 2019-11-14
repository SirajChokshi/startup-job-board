import React, { Component } from 'react';

// Components
import { Container } from 'react-grid-system';
import { Link } from 'react-router-dom';
import Feed from '../components/Feed';
import Order from '../components/Order';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle as addIcon } from '@fortawesome/free-solid-svg-icons'

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

export default class MyListings extends Component {
  state = {
    listings: []
  }

  componentDidMount() {
      fetch('/api/listings/?format=json&listOrgID=1')
      .then(res => res.json())
      .then((data) => {
        this.setState({ listings: data })
      })
      .catch(console.log)
    }

  render () {
    return (
      <>
        <div className="hero" style={{paddingBottom: 12 + "vh"}}>
          <div className="hero-inner">
            <h1>My Listings</h1>
            <span className="sub-title">
                <Link to="/dashboard">Dashboard</Link>&nbsp;
                | &nbsp;<Link to="/students">Recruit a student</Link>
            </span>
          </div>
        </div>
        <br></br>
        <Container>
              <div className="result-header-wrapper">
                <h2>Results</h2>
                <div className="order-wrapper">
                  <Order className="results-sort" />
                </div>
              </div>
              <Link id="new-listing-button" style={addListingStyles} to="/my-listings/new">
                <FontAwesomeIcon icon={addIcon}></FontAwesomeIcon>
                 &nbsp; Create a new listing
                 <div className="shadow"></div>
              </Link>
              <Feed listings={this.state.listings} />
        </Container>
      </>
    )
 }
}
