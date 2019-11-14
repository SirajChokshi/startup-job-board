import React, { Component } from 'react';
import { Container } from 'react-grid-system';

// Components
import Feed from '../components/Feed';

export default class StudentLanding extends Component {
  state = {
  }

  render () {
      return (
        <Container id="below">
          <h2>Welcome back {this.props.userName},<br></br>Here are some newly posted positions:</h2>
        </Container>
      )
    }
  }
