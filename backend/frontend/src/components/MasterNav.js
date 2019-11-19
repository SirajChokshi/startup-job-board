import React, { Component } from 'react';
import Nav from './Nav';
import NavStartup from './NavStartup';

import { connect } from 'react-redux';

class MasterNav extends Component {
  state = {
  }

  render () {
      return (
        <>
          { this.props.isStartup && <NavStartup /> }
          { !this.props.isStartup && <Nav /> }
        </>
      )
   }
}

const mapStateToProps = (state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  isStartup: state.isStartup
});

export default connect(mapStateToProps)(MasterNav)
