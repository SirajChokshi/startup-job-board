import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';

// Components
import Noti from '../components/Noti';
import Feed from '../components/Feed';

export default class Notifications extends Component {
  state = {
  }

  render () {
      return (
        <span>
          <div className="hero">
            <div className="hero-inner">
              <h1>Your Notifications</h1>
            </div>
          </div>
          <br></br>
          <Container>
          </Container>
        </span>
      )
   }
}
