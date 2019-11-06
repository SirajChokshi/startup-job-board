import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as bookmarkIcon, faExternalLinkAlt as appIcon, faMapMarkerAlt as locationIcon } from '@fortawesome/free-solid-svg-icons'
import { faClock as deadlineIcon } from '@fortawesome/free-regular-svg-icons'

export default class Education extends Component {
  state = {
  }

  render () {
      return (
        <div className="education profile-block">
          <h3>{this.props.name} &mdash; {this.props.gradDate}</h3>
          <p>Major: {this.props.major}</p>
          <p></p>
          <div className="shadow"></div>
        </div>
      )
   }
}
