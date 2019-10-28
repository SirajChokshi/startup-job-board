import React, { Component } from 'react';

// Components
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import Feed from '../components/Feed';
import Order from '../components/Order';

export default class MyListings extends Component {
  state = {
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
              <Feed />
        </Container>
      </>
    )
 }
}
