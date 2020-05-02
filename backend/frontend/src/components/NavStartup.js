import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import * as axios from 'axios';
import { connect } from 'react-redux';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEdit as listingsActive,
    faBuilding as userActive,
    faCaretDown as darr,
    faAddressCard as studentsActive,
    faCommentAlt as logoActive,
    faCompass as dashboardActive,
    faBars as menu,
    faSearch as search,
    faFolderOpen as jobsActive,
    faBookmark as bookmarkActive,
    faCog as settings,
    faCogs as settingsActive, faSignOutAlt as signoutIcon, faSignInAlt as login
} from '@fortawesome/free-solid-svg-icons'
import {
    faEdit as listings,
    faBuilding as user,
    faAddressCard as students,
    faCommentAlt as logo,
    faCompass as dashboard,
    faFolderOpen as jobs, faBookmark as bookmark
} from '@fortawesome/free-regular-svg-icons'

class NavStartup extends Component {
  state = {
      active: false
  };

  async logout(e) {
    try {
      const response = await axios({
          url: '/api/auth/logout',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Token ' + localStorage.getItem("token")
          }
      });
      localStorage.removeItem("token");
      this.props.dispatch({ type: "LOGOUT" });
      this.props.history.push('/');
    } catch (error) {
        this.props.dispatch({ type: "LOGOUT" });
        this.props.history.push('/');
    }
  }

  render () {
      return (
          <nav>
              <ul className="mobile-nav" id="mobile-nav-fetch">
                  <li>
                      <NavLink to="/" exact activeClassName="active-nav" id="logo-nav-mobile">
                          <FontAwesomeIcon className="def-icon" icon={logo} />
                          <FontAwesomeIcon className="act-icon" icon={logoActive} />
                          &nbsp; StartupMatch
                      </NavLink>
                  </li>
                  <li>
                      <button id="mobile-menu-toggle" onClick={ () =>
                      {
                          window.scrollTo(0, 0);
                          this.setState({active: !this.state.active});
                          const page = document.getElementById('html');
                          if (page.style.overflow === "hidden") page.style.overflow = "auto";
                          else page.style.overflow = "hidden";
                      }
                      }>
                          <FontAwesomeIcon icon={menu} />
                      </button>
                  </li>
              </ul>
              <ul id="nav-links" className={this.state.active ? 'toggle-mobile-nav' : undefined} >
                  <li>
                      <NavLink to="/" exact activeClassName="active-nav">
                          <FontAwesomeIcon className="def-icon" icon={logo} />
                          <FontAwesomeIcon className="act-icon" icon={logoActive} />
                          &nbsp; StartupMatch
                      </NavLink>
                  </li>
                  {/* Dashboard */}
                  <li>
                      <NavLink to="/dashboard" exact activeClassName="active-nav">
                          <FontAwesomeIcon className="def-icon" icon={dashboard} />
                          <FontAwesomeIcon className="act-icon" icon={dashboardActive} />
                          &nbsp; Dashboard
                      </NavLink>
                  </li>
                  {/*Search for students/recruit*/}
                  <li>
                      <NavLink to="/recruit" exact activeClassName="active-nav">
                          <FontAwesomeIcon className="def-icon" icon={students} />
                          <FontAwesomeIcon className="act-icon" icon={studentsActive} />
                          &nbsp; Students
                      </NavLink>
                  </li>
                  {/*This Startup's Listings*/}
                  <li>
                      <NavLink to="/my-listings" exact activeClassName="active-nav">
                          <FontAwesomeIcon className="def-icon" icon={listings} />
                          <FontAwesomeIcon className="act-icon" icon={listingsActive} />
                          &nbsp; My Listings
                      </NavLink>
                  </li>
                  <li className="dropdown">
                          <span id="nav-drop-link">
                               <FontAwesomeIcon className="def-icon" icon={user} />
                               <FontAwesomeIcon className="act-icon" icon={userActive} />
                                 &nbsp; Me &nbsp;
                                 <span className="dropdown-arr"><FontAwesomeIcon icon={darr} /></span>
                          </span>
                              <div className="dropdown-content">
                                  <NavLink to={"/org/" + this.props.user.id} >Profile</NavLink>
                                  <hr />
                                  <NavLink to="/org-settings">Settings</NavLink>
                                  <a onClick={(e) => {e.preventDefault(); this.logout()}} >Logout</a>
                              </div>
                          </li>
                          <li className="show-on-mobile">
                              <NavLink to={"/org/" + this.props.user.id} exact activeClassName="active-nav">
                                  <FontAwesomeIcon className="def-icon" icon={user} />
                                  <FontAwesomeIcon className="act-icon" icon={userActive} />
                                  &nbsp; Profile
                              </NavLink>
                          </li>
                          <li className="show-on-mobile">
                              <NavLink to="/org-settings" exact activeClassName="active-nav">
                                  <FontAwesomeIcon className="def-icon" icon={settings} />
                                  <FontAwesomeIcon className="act-icon" icon={settingsActive} />
                                  &nbsp; Settings
                              </NavLink>
                          </li>
                          <li className="show-on-mobile">
                              <a onClick={(e) => {e.preventDefault(); this.logout()}} >
                                  <FontAwesomeIcon icon={signoutIcon} />
                                  &nbsp; Logout
                              </a>
                          </li>
              </ul>
          </nav>
      )
   }
}


const mapStateToProps = (state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  isStartup: state.isStartup
});

export default withRouter(connect(mapStateToProps)(NavStartup));
