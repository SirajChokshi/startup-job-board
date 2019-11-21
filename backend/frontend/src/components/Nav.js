import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import * as axios from 'axios';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as bookmarkActive, faBell as bellActive, faUser as userActive, faSearch as search, faCaretDown as darr, faFolderOpen as jobsActive, faCommentAlt as logoActive, faSignInAlt as login, faBars as menu, faListAlt as applicationsActive, faCog as settings, faCogs as settingsActive, faSignOutAlt as signoutIcon } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as bookmark, faBell as bell, faUser as user, faFolderOpen as jobs, faCommentAlt as logo, faListAlt as applications } from '@fortawesome/free-regular-svg-icons'
// redux
import { connect } from 'react-redux';

class Nav extends Component {
  state = {
    active: false
  }

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
      console.log('Successful Logoff');
    } catch (error) {
      if (error.response.status == 400 || error.response.status == 401) {
        localStorage.removeItem("token");
        this.props.dispatch({ type: "LOGOUT" });
      } else console.error(error);
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
                    this.setState({active: !this.state.active})
                    var x = document.getElementById('html');
                    if (x.style.overflow === "hidden") x.style.overflow = "auto";
                    else x.style.overflow = "hidden";
                  }
                }>
                <FontAwesomeIcon icon={menu} />
              </button>
            </li>
          </ul>
          <ul id="nav-links" className={this.state.active ? 'toggle-mobile-nav' : undefined} >
           <li id="nav-logo-link">
             <NavLink to="/" exact activeClassName="active-nav">
               <FontAwesomeIcon className="def-icon" icon={logo} />
               <FontAwesomeIcon className="act-icon" icon={logoActive} />
               &nbsp; StartupMatch
             </NavLink>
           </li>
           <li id="search-nav">
             <input type="text" placeholder={"Search for a job..."} className="search" style={{color: '#8e8e8e'}} />
             <span id="nav-search-icon-wrapper">
               <FontAwesomeIcon icon={search} style={{verticalAlign: 'middle', color: '#8e8e8e', fontSize: 14 + 'px', marginBottom: 2.6 + 'px'}} />
             </span>
           </li>
           <li>
             <NavLink to="/jobs" exact activeClassName="active-nav">
               <FontAwesomeIcon className="def-icon" icon={jobs} />
               <FontAwesomeIcon className="act-icon" icon={jobsActive} />
               &nbsp; Jobs
             </NavLink>
           </li>
           <li>
             <NavLink to="/bookmarks" exact activeClassName="active-nav">
               <FontAwesomeIcon className="def-icon" icon={bookmark} />
               <FontAwesomeIcon className="act-icon" icon={bookmarkActive} />
               &nbsp; Bookmarks
             </NavLink>
           </li>
           {this.props.isAuthenticated ?
             (<>
              <li className="dropdown">
                <span id="nav-drop-link">
                  <FontAwesomeIcon className="def-icon" icon={user} />
                  <FontAwesomeIcon className="act-icon" icon={userActive} />
                  &nbsp; Me &nbsp;
                  <span className="dropdown-arr"><FontAwesomeIcon icon={darr} /></span>
                </span>
                <div className="dropdown-content">
                  <NavLink to={"/user-profile/" + this.props.user.id}>Profile</NavLink>
                  {/*<NavLink to="/applications/">Applied</NavLink>*/}
                  <hr></hr>
                  <NavLink to="/user-settings">Settings</NavLink>
                  <a onClick={(e) => {e.preventDefault(); this.logout()}} >Logout</a>
                </div>
              </li>
              <li className="show-on-mobile">
                <NavLink to="/user-profile" exact activeClassName="active-nav">
                  <FontAwesomeIcon className="def-icon" icon={user} />
                  <FontAwesomeIcon className="act-icon" icon={userActive} />
                  &nbsp; Profile
                </NavLink>
              </li>
              {/*<li className="show-on-mobile">*/}
              {/*  <NavLink to="/applications" exact activeClassName="active-nav">*/}
              {/*    <FontAwesomeIcon className="def-icon" icon={applications} />*/}
              {/*    <FontAwesomeIcon className="act-icon" icon={applicationsActive} />*/}
              {/*    &nbsp; Applications*/}
              {/*  </NavLink>*/}
              {/*</li>*/}
              <li className="show-on-mobile">
                <NavLink to="/user-settings" exact activeClassName="active-nav">
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
            </>) : (<>
            <li>
              <NavLink to="/login" exact activeClassName="active-nav">
                <FontAwesomeIcon icon={login} />
                &nbsp; Login
              </NavLink>
            </li>
            </>)
        }
          </ul>
        </nav>
      )
   }
}

const mapStateToProps = (state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps)(Nav);
