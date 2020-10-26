import React, { Component } from 'react';

// Components
import LandingHero from '../components/LandingHero';
import StartupHero from '../components/StartupHero';
import GuestLanding from '../components/GuestLanding';
import StudentLanding from '../components/StudentLanding';
// redux
import { connect } from 'react-redux';

class Home extends Component {
  state = {
  }

  render () {
    if (this.props.isAuthenticated) {
      if (!this.props.isStartup) {
        return (
          <>
            <LandingHero />
            <StudentLanding userName={(this.props.user).firstName} />
          </>
        )
      } else {
        return (
          <>
            <StartupHero />
          </>
        )
      }
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
  isAuthenticated: state.isAuthenticated,
  isStartup: state.isStartup
});

export default connect(mapStateToProps)(Home);
