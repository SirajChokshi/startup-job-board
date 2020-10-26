import React, { Component } from 'react';
import { Container } from 'react-grid-system';
import { withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch as search } from '@fortawesome/free-solid-svg-icons'

class LandingHero extends Component {
  state = {

  }

  searchForward = () => {
      this.props.history.push({
          pathname: '/jobs',
          state: {
              search: document.getElementById("jobs-search-bar").value
          }
      })
  }

  render () {
      return (
        <span>
          <div id="hero">
            <Container>
              <div id="hero-inner">
                <h1>What type of experience are you looking for?</h1>
                  <div id="search-bar-wrapper">
                     <input type="search" id="jobs-search-bar" placeholder="Search for a job or internship..." className="search" onSubmit={this.searchForward} />
                       <button id="search-icon-wrapper" onClick={this.searchForward} >
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

export default withRouter(LandingHero);
