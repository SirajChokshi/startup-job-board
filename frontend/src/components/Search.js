import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch as search } from '@fortawesome/free-solid-svg-icons'


export default class Search extends Component {
  state = {
  }

  render () {
      return (
        <div id="search-bar-wrapper">
          <span id="search-icon-wrapper">
            <FontAwesomeIcon icon={search} style={{verticalAlign: 'middle', color: '#8e8e8e', fontSize: 18 + 'px', marginBottom: 4 + 'px'}} />
          </span>
           <input type="text" placeholder={"Search for a job, role or position..."} className="search"></input>
        </div>
      )
   }
}
