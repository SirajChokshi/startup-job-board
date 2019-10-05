import React, { Component } from 'react';
import { Container } from 'react-grid-system';
import Search from '../components/Search';

export default class LandingHero extends Component {
  state = {
  }

  render () {
      return (
        <span>
          <div id="hero">
            <Container>
              <div id="hero-inner">
                <h1>What type of experience are you looking for?</h1>
                <Search />
              </div>
            </Container>
          </div>
        </span>
      )
   }
}
