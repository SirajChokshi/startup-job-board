import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';

// Components
import Sort from '../components/Sort';
import Feed from '../components/Feed';

export default class Bookmarks extends Component {
  state = {
  }

  render () {
      return (
        <span>
          <div className="hero">
            <div className="hero-inner">
              <h1>Bookmarks</h1>
            </div>
          </div>
          <br></br>
          <Container>
            <Sort />
            <Feed />
          </Container>
        </span>
      )
   }
}
