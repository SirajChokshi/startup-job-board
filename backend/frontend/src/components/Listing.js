import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as axios from 'axios';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as bookmarkIcon, faExternalLinkAlt as appIcon, faMapMarkerAlt as locationIcon } from '@fortawesome/free-solid-svg-icons'
import { faClock as deadlineIcon } from '@fortawesome/free-regular-svg-icons'

class Listing extends Component {
  state = {
    company: [],
    bookmarked: false
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) document.getElementById("bookmark-button-" + this.props.id).style.display = 'none';
    try {
      fetch('/api/startups/' + this.props.company + '/?format=json', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem("token")
        }
      })
      .then(res => res.json())
      .then((data) => {
        this.setState({ company: data })
      })
    } catch (error) {
      console.log("Image Retrieval Error");
    }
  }

  async bookmarkThis() {
    try {
      const resp = await axios({
          url:' /api/listings/' + this.props.id + '/toggle/',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Token ' + localStorage.getItem("token")
          },
        });
      const json = await resp.response;
      this.setState(json.isBookmarked, this.componentDidMount);
    } catch (error) {
      console.error(error);
    }
  }

  addDefaultSrc(ev) {
    ev.target.src = '/img/org/missing.png';
  }

  render () {
      return (
        <div className="listing">
          <Link className="image-wrapper" to={"/org/" + this.props.company}><img onError={this.addDefaultSrc} src={this.props.logo} alt={this.props.company}></img></Link>
          <div className="inf">
            <Link to={this.props.jobPage}><h2>{this.props.listName} | {this.state.company.orgName}</h2></Link>
            <p className="sub-title">
              <FontAwesomeIcon icon={locationIcon}></FontAwesomeIcon>
              &nbsp; {this.props.listLocation} &nbsp; &mdash; &nbsp;&nbsp;
              <FontAwesomeIcon icon={deadlineIcon}></FontAwesomeIcon>
              &nbsp; {this.props.listDeadline}
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
              <button className={"button-secondary " + (this.state.bookmarked ? "bookmarked" : "bookmark") } id={"bookmark-button-" + this.props.id} onClick={(e) => {e.preventDefault(); this.bookmarkThis()}} >
                <FontAwesomeIcon icon={bookmarkIcon}></FontAwesomeIcon>
                &nbsp; Bookmark
              </button>
            </div>
          </div>
          <div style={{clear: "both"}}></div>
          <div className="shadow"></div>
        </div>
      )
   }
}

const mapStateToProps = (state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps)(Listing);
