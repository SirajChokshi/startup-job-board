import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch as search } from '@fortawesome/free-solid-svg-icons'

export default class Search extends Component {
  state = {
  }

  render () {
      return (
        <div id="search-bar-wrapper">
           <input type="text" placeholder={this.props.placeholder} className="search"></input>
             <span id="search-icon-wrapper">
               <FontAwesomeIcon icon={search} style={{verticalAlign: 'middle', color: '#8e8e8e', fontSize: 18 + 'px', marginBottom: 4 + 'px'}} />
             </span>
        </div>
      )
   }
}
