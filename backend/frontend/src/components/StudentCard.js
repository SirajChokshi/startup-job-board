import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt as appIcon, faGraduationCap as gradIcon, faBook as majorIcon } from '@fortawesome/free-solid-svg-icons'

class Listing extends Component {
  state = {

  }

  addDefaultSrc(ev) {
    ev.target.src = '/img/usr/missing.png';
  }

  render () {
      return (
        <div className="student-card">
          <div className="top-background" >
            <Link className="image-wrapper" to={"/user-profile/" + this.props.id}>
              <img onError={this.addDefaultSrc} src={this.props.logo} alt={this.props.userName} />
            </Link>
            <Link to={this.props.jobPage} className="name"><h2>{this.props.userName}</h2></Link>
          </div>
          <div className="underlay-block" >
            <p className="info-head">
              &nbsp;<FontAwesomeIcon icon={majorIcon} /> &nbsp; {this.props.userMajor}<br />
            <FontAwesomeIcon icon={gradIcon} /> &nbsp;{this.props.gradYear}
            </p>
          </div>
          <div className="inf">
            <p>
              {this.props.bio}
              &nbsp;<Link to={this.props.jobPage} className="read-more">Read more...</Link>
            </p>
              <Link to={this.props.jobPage} className="button">
                View Profile &nbsp;
                <FontAwesomeIcon icon={appIcon} />
              </Link>
          </div>
          <div style={{clear: "both"}} />
          <div className="shadow" />
        </div>
      )
   }
}

const mapStateToProps = (state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps)(Listing);
