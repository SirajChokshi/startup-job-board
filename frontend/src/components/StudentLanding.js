import React, { Component } from 'react';
import { Container } from 'react-grid-system';

// Components
import Feed from '../components/Feed';

var userName = "Siraj";

export default class StudentLanding extends Component {
  state = {
  }

  render () {
      return (
        <Container id="below">
          <h2>Welcome back {userName},<br></br>Here are some newly posted positions:</h2>
          <Feed />
        </Container>
      )
    }
  }
