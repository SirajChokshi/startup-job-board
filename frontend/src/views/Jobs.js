import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';

// Components
import Filter from '../components/Filter';
import Feed from '../components/Feed';
import Search from '../components/Search';

export default class Jobs extends Component {
  state = {
  }

  render () {
      return (
        <span>
          <div className="hero" style={{paddingBottom: 12 + "vh"}}>
            <div className="hero-inner">
              <h1>Look for a job,</h1>
              <Search />
            </div>
          </div>
          <br></br>
          <Container>
            <Row>
              <Col xl={3} lg={4}>
                <h2>Filter</h2>
                <Filter />
              </Col>
              <Col xl={9} lg={8}>
                <h2>Results</h2>
                <Feed />
              </Col>
            </Row>
          </Container>
        </span>
      )
   }
}
