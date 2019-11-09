import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
  state = {
  }

  render () {
      return (
        <footer>
          <Container>
            <Row>
              <Col size="3">
                <h5>Students</h5>
                <Link to="jobs">Jobs</Link>
                <Link to="bookmarks">Bookmarks</Link>
                <Link to="user-profile">Profile</Link>
              </Col>
              <Col size="3">
                <h5>Startups</h5>
                <Link to="students">Recruit</Link>
                <Link to="my-listings">Listings</Link>
                <Link to="startup-profile">Profile</Link>
              </Col>
              <Col size="3">
                <h5>Support</h5>
                <Link to="docs">Documentation</Link>
                <Link to="privacy-policy">Privacy Policy</Link>
                <Link to="about">About</Link>
              </Col>
              <Col size="3">
                <p>
                  Copyright &copy; 2019 Client Company
                  <span className="lastlines"><br></br>1st Street, Acton MA 01720
                  <br></br>+1 (781) 708-6950
                  <br></br>email@host.com
                  </span>
                </p>
              </Col>
            </Row>
          </Container>
        </footer>
      )
   }
}
