import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as axios from 'axios';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as favoriteIcon, faExternalLinkAlt as appIcon, faMapMarkerAlt as locationIcon, faGraduationCap as gradIcon, faBook as majorIcon } from '@fortawesome/free-solid-svg-icons'
import { faClock as deadlineIcon } from '@fortawesome/free-regular-svg-icons'

class Listing extends Component {
  state = {
    company: [],
    favorited: false
  }

  async componentWillMount() {
    if (this.props.isAuthenticated) {
      try {
        const userResponse = await axios({
            url:'/api/users/' + this.props.user.id + "/",
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
              'Authorization': 'Token ' + localStorage.getItem("token")
            },
          });
        const userJson = await userResponse.data;
        this.props.dispatch({ type: "UPDATEUSER", user: userJson });
        // const oldUserfavorites = Object.keys(userJson.userfavorites);
        // for (var i = 0; i < oldUserfavorites.length; ++i) {
        //   if (this.props.id == oldUserfavorites[i]) {
        //     this.setState({favorited: true}, this.componentDidMount);
        //     break;
        //   }
        // }
      } catch (error) {
        console.error(error);
      }
    }
    this.setState(this.state);
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) document.getElementById("favorite-button-" + this.props.id).style.display = 'none';
    fetch('/api/users/' + this.props.id + '/?format=json', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({ company: data });
      console.log("LINE 58 --> Fetched Company Name");
    })
    .catch(console.error)
  }

  // componentDidUpdate() {
  //   if (!this.props.isAuthenticated) document.getElementById("favorite-button-" + this.props.id).style.display = 'none';
  //   fetch('/api/startups/' + this.props.company + '/?format=json', {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'content-type': 'application/json',
  //       'Authorization': 'Token ' + localStorage.getItem("token")
  //     }
  //   })
  //   .then(res => res.json())
  //   .then((data) => {
  //     this.setState({ company: data });
  //     console.log("LINE 58 --> Fetched Company Name");
  //   })
  //   .catch(console.error)
  // }

  async updateUser() {
    try {
      const userResponse = await axios({
          url:' /api/users/' + this.props.user.id,
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Token ' + localStorage.getItem("token")
          },
        });
      const userJson = await userResponse.data;
      this.props.dispatch({ type: "UPDATEUSER", user: userJson });
    } catch (error) {
      console.error(error);
    }
  }

  async favoriteThis() {
    try {
      const resp = await axios({
          url:' /api/users/' + this.props.id + '/toggle/',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Token ' + localStorage.getItem("token")
          },
        });
      const json = await resp.data;
      this.setState({favorited: json.isfavorited}, this.componentDidMount);
    } catch (error) {
      console.error(error);
    }
  }

  addDefaultSrc(ev) {
    ev.target.src = '/img/usr/missing.png';
  }

  render () {
      return (
        <div className="student-card">
          <div className="top-background" >
            <Link className="image-wrapper" to={"/user-profile/" + this.props.id}>
              <button className={"button-secondary fav " + (this.state.favorited ? "favorited" : "favorite") } id={"favorite-button-" + this.props.id} onClick={(e) => {e.preventDefault(); this.favoriteThis()}} >
                <FontAwesomeIcon icon={favoriteIcon}></FontAwesomeIcon>
              </button>
              <img onError={this.addDefaultSrc} src={this.props.logo} alt={this.props.userName}></img>
            </Link>
            <Link to={this.props.jobPage} className="name"><h2>{this.props.userName}</h2></Link>
          </div>
          <div className="underlay-block" >
            <p className="info-head">
              &nbsp;<FontAwesomeIcon icon={majorIcon}></FontAwesomeIcon> &nbsp; {this.props.userMajor}<br></br>
            <FontAwesomeIcon icon={gradIcon}></FontAwesomeIcon> &nbsp;{this.props.gradYear}
            </p>
          </div>
          <div className="inf">
            <p>
              {this.props.bio}
              &nbsp;<Link to={this.props.jobPage} className="read-more">Read more...</Link>
            </p>
              <Link to={this.props.jobPage} className="button">
                View Profile &nbsp;
                <FontAwesomeIcon icon={appIcon}></FontAwesomeIcon>
              </Link>
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
