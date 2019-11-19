import React, { Component } from 'react';
import { Container } from 'react-grid-system';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch as search } from '@fortawesome/free-solid-svg-icons';

export default class LandingHero extends Component {
  state = {
  }

  render () {
      return (
        <span>
          <div id="hero">
            <Container>
              <div id="hero-inner">
                <h1>Find the perfect candidate,</h1>
                  <div id="search-bar-wrapper">
                     <input type="search" id="jobs-search-bar" placeholder="Search for a skill, major or qualification..." className="search" onChange={this.search} ></input>
                       <button id="search-icon-wrapper" onClick={this.search} >
                         <FontAwesomeIcon icon={search} style={{verticalAlign: 'middle', color: '#8e8e8e', fontSize: 18 + 'px', marginBottom: 4 + 'px'}} />
                       </button>
                  </div>
              </div>
            </Container>
          </div>
        </span>
      )
   }
}
