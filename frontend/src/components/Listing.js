import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as bookmarkIcon, faExternalLinkAlt as appIcon, faMapMarkerAlt as locationIcon } from '@fortawesome/free-solid-svg-icons'
import { faClock as deadlineIcon } from '@fortawesome/free-regular-svg-icons'

var bookmarked = false;
var bookmarkButtonClass = "bookmark button-secondary";

if (bookmarked) {
  bookmarkButtonClass = "button-secondary bookmarked";
}

export default class Listing extends Component {
  state = {
    company: []
  }

  componentDidMount() {
      fetch(this.props.api + '/api/startups/' + this.props.company + '/?format=json', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json',
          'Authorization': ' Token '+'',
        }
      })
      .then(res => res.json())
      .then((data) => {
        this.setState({ company: data })
      })
      .catch(console.log)
    }

  addDefaultSrc(ev) {
    ev.target.src = '/img/org/missing.png';
  }

  render () {
      return (
        <div className="listing">
          <Link className="image-wrapper" to={this.props.company}><img onError={this.addDefaultSrc} src={this.props.logo} alt={this.props.company}></img></Link>
          <div className="inf">
            <Link to={this.props.jobPage}><h2>{this.props.listName} | {this.state.company.orgName}</h2></Link>
            <p className="sub-title">
              <FontAwesomeIcon icon={locationIcon}></FontAwesomeIcon>
              &nbsp; {this.props.listLocation} &nbsp; &mdash; &nbsp;&nbsp;
              <FontAwesomeIcon icon={deadlineIcon}></FontAwesomeIcon>
              &nbsp; {this.props.deadline}
            </p>
            <p>
              {this.props.listDesc}
              &nbsp;<Link to={this.props.jobPage} className="read-more">Read more...</Link>
            </p>
            <div className="button-wrapper">
              <Link to={this.props.jobPage} className="button">
                Apply &nbsp;
                <FontAwesomeIcon icon={appIcon}></FontAwesomeIcon>
              </Link>
              <button className={bookmarkButtonClass}>
                <FontAwesomeIcon icon={bookmarkIcon}></FontAwesomeIcon>
                &nbsp; Bookmark
              </button>
              <a href="" className="similar-pos">Similar positions...</a>
            </div>
          </div>
          <div style={{clear: "both"}}></div>
          <div className="shadow"></div>
        </div>
      )
   }
}
