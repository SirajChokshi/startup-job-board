import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';

// Components
import Filter from '../components/Filter';
import Feed from '../components/Feed';
import Search from '../components/Search';
import Order from '../components/Order';

export default class Jobs extends Component {
  state = {
    jobs: []
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/');
      const jobs = await res.json();
      this.setState({
        jobs
      });
    } catch (e) {
      console.log(e);
    }
  }

  render () {
      return (
        <span>
          <div className="hero" style={{paddingBottom: 12 + "vh"}}>
            <div className="hero-inner">
              <h1>Look for a job,</h1>
              <Search placeholder={"Search for a job, role or position..."} />

                {this.state.jobs.map(item => (
                  <div key={item.id}>
                    <h1>{item.name}</h1>
                    <h1>{item.major}</h1>
                    <h1>{item.status}</h1>
                  </div>
                ))}

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
                <Feed />
              </Col>
            </Row>
          </Container>
        </span>
      )
   }
}
