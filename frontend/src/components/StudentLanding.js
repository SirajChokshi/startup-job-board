import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';

// Components
import Results from '../components/Results';

var userName = "Siraj";

export default class StudentLanding extends Component {
  state = {
  }

  render () {
      return (
        <Container id="below">
          <h2>Welcome back {userName},<br></br>Here are some newly posted positions:</h2>
          <Results />
        </Container>
      )
    }
  }
