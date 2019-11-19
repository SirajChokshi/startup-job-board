import React, { Component } from 'react';
import { Container } from 'react-grid-system';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import * as axios from 'axios';

// Components
import Sort from '../components/Sort';
import Feed from '../components/Feed';

class Bookmarks extends Component {
  state = {
    listings: []
  }

  async findListings() {
    try {
      const response = await axios({
          url: '/api/users/data/bookmarks',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Token ' + localStorage.getItem("token")
          }
      });
      const bookmarks = await response.data;
      this.setState({ listings: bookmarks });
    } catch (error) {
      console.error(error);
      console.error("@ERROR: Bookmark Retrieval Error!")
    }
  }

  componentDidMount() {
    this.findListings();
  }

  render () {
    if (!this.props.isAuthenticated) {
      return (
        <Redirect to="/login" />
      )
    } else if (this.props.isStartup) {
      return (
        <Redirect to="/" />
      )
    }
      return (
        <span>
          <div className="hero">
            <div className="hero-inner">
              <h1>Bookmarks</h1>
              <span className="sub-title">
                  <Link to="/jobs">My Applications</Link>&nbsp;
                  | &nbsp;<Link to="/jobs">Job Search</Link>
              </span>
            </div>
          </div>
          <br></br>
          <Container>
            <Sort />
            <Feed listings={this.state.listings} />
          </Container>
        </span>
      )
   }
}

const mapStateToProps = (state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps)(Bookmarks);
