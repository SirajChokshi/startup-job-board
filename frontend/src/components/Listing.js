import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as bookmarkIcon, faExternalLinkAlt as appIcon, faMapMarkerAlt as locationIcon } from '@fortawesome/free-solid-svg-icons'
import { faClock as deadlineIcon } from '@fortawesome/free-regular-svg-icons'

var jobid = 0;
var logo = "https://via.placeholder.com/100";
var bookmarked = false;
var bookmarkButtonClass = "bookmark button-secondary";
var jobPage = "/";
var deadline = "November 2nd";
var location = "Champaign, IL";
var company = "StartupName";
var shortDesc = "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

if (bookmarked) {
  bookmarkButtonClass = "button-secondary bookmarked";
}

export default class Listing extends Component {
  state = {
  }

  addDefaultSrc(ev) {
    ev.target.src = 'https://via.placeholder.com/300';
  }

  render () {
      return (
        <div className="listing">
          <Link className="image-wrapper" to={this.props.appLink}><img onError={this.addDefaultSrc} src={this.props.logo} alt={this.props.company}></img></Link>
          <div className="inf">
            <Link to={this.props.jobPage}><h2>{this.props.jobName} | {this.props.company}</h2></Link>
            <p className="sub-title">
              <FontAwesomeIcon icon={locationIcon}></FontAwesomeIcon>
              &nbsp; {this.props.location} &nbsp; &mdash; &nbsp;&nbsp;
              <FontAwesomeIcon icon={deadlineIcon}></FontAwesomeIcon>
              &nbsp; {this.props.deadline}
            </p>
            <p>
              {this.props.shortDesc}
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
