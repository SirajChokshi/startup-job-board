import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';

export default class Error extends Component {
  state = {
  }

  render () {
      return (
        <span>
          <div className="hero">
            <div className="hero-inner">
              <h1>Error 404</h1>
            </div>
          </div>
          <br></br>
          <Container>
            <Row>
              <Col md={6}>
                <div style={{fontSize: '80px'}}><strong>ERROR 404</strong> <br></br> <Link to="/">Back to<br></br> home &rarr;</Link></div>
              </Col>
              <Col md={6}>
                <img src="https://media.giphy.com/media/jWexOOlYe241y/giphy.gif"></img>
              </Col>
            </Row>
          </Container>
        </span>
      )
   }
}
