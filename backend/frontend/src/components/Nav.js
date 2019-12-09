import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import * as axios from 'axios';
import BannerError from './BannerError';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as bookmarkActive, faUser as userActive, faSearch as search, faCaretDown as darr, faFolderOpen as jobsActive, faCommentAlt as logoActive, faSignInAlt as login, faBars as menu, faCog as settings, faCogs as settingsActive, faSignOutAlt as signoutIcon } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as bookmark, faUser as user, faFolderOpen as jobs, faCommentAlt as logo } from '@fortawesome/free-regular-svg-icons'
// redux
import { connect } from 'react-redux';

class Nav extends Component {
  state = {
    active: false
  }

    searchForward = () => {
        this.props.history.push({
            pathname: '/jobs',
            state: {
                search: document.getElementById("jobs-search-bar").value
            }
        });
        if(this.props.location.pathname === "/jobs") {
            window.location.reload();
        }
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
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 401) {
        localStorage.removeItem("token");
        this.props.dispatch({ type: "LOGOUT" });
      } else {
          console.error(error);
          localStorage.removeItem("token");
          this.props.dispatch({ type: "LOGOUT" });
      }
    }
    console.log("logged off");
  }

  render () {
      return (
        <nav>
            {/*<BannerError type="success" message="Test success message STR" />*/}
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
                    this.setState({active: !this.state.active});
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
             <input type="search" id="jobs-search-bar" placeholder="Search for a job..." className="search" onSubmit={this.searchForward} />
             <button id="nav-search-icon-wrapper" onClick={this.searchForward}>
               <FontAwesomeIcon icon={search} style={{verticalAlign: 'bottom', color: '#8e8e8e', fontSize: 16 + 'px', marginBottom: 2 + 'px'}} />
             </button>
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

export default withRouter(connect(mapStateToProps)(Nav));
