import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Container } from 'react-grid-system';

// Components


class Dashboard extends Component {
  state = {

  }

  render () {
    if (!this.props.isAuthenticated) {
      return (
        <Redirect to="/login"  />
      )
    } else if (!this.props.isStartup) {
      return (
        <Redirect to="/"  />
      )
    }
    else return (
        <Container>
          <h1>{this.props.user.orgName}</h1>
        </Container>
      )
   }
}

const mapStateToProps = (state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  isStartup: state.isStartup
});

export default withRouter(connect(mapStateToProps)(Dashboard));
