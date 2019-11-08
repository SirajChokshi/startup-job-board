import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';

// Components
import Filter from '../components/Filter';
import Feed from '../components/Feed';
import Search from '../components/Search';
import Order from '../components/Order';

var api = 'https://e63214ab.ngrok.io';

export default class Jobs extends Component {
  state = {
    listings: []
  }

  componentDidMount() {
      fetch(api + '/api/listings/?format=json')
      .then(res => res.json())
      .then((data) => {
        this.setState({ listings: data })
      })
      .catch(console.log)
    }

  render () {
      return (
        <>
          <div className="hero" id="search-hero">
            <div className="hero-inner">
              <h1>Look for a job,</h1>
              <Search placeholder={"Search for a job, role or position..."} />
              <br></br>
              <span className="sub-title">
                  <Link to="/applications">My Applications</Link>&nbsp;
                  | &nbsp;<Link to="/bookmarks">Bookmarks</Link>
              </span>
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
                <div className="result-header-wrapper">
                  <h2>Results</h2>
                  <div className="order-wrapper">
                    <Order className="results-sort" />
                  </div>
                </div>
                <Feed listings={this.state.listings} api={api} />
              </Col>
            </Row>
          </Container>
        </>
      )
   }
}
