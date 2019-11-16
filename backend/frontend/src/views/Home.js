import React, { Component } from 'react';

// Components
import LandingHero from '../components/LandingHero';
import GuestLanding from '../components/GuestLanding';
import StudentLanding from '../components/StudentLanding';
// redux
import { connect } from 'react-redux';

class Home extends Component {
  state = {
  }

  render () {
    if (this.props.isAuthenticated) {
        // LOGGED IN STUDENT LANDING
        return (
          <>
            <LandingHero />
            <StudentLanding userName={(this.props.user).firstName} />
          </>
        )
      } else {
      // GUEST LANDING
      return (
        <>
          <LandingHero />
          <GuestLanding />
        </>
      )
    }
   }
}

const mapStateToProps = (state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps)(Home);
