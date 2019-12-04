import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import * as axios from 'axios';
import { connect } from 'react-redux';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit as listingsActive, faBell as bellActive, faBuilding as userActive, faSearch as search, faCaretDown as darr, faAddressCard as studentsActive, faCommentAlt as logoActive, faCompass as dashboardActive } from '@fortawesome/free-solid-svg-icons'
import { faEdit as listings, faBell as bell, faBuilding as user, faAddressCard as students, faCommentAlt as logo, faCompass as dashboard } from '@fortawesome/free-regular-svg-icons'

class NavStartup extends Component {
  state = {
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
      this.props.history.push('/');
    } catch (error) {
        this.props.dispatch({ type: "LOGOUT" });
        this.props.history.push('/');
    }
  }

  render () {
      return (
        <nav>
          <ul style={{height: "64px"}}>
           {/*Logo/Home Link*/}
           <li>
             <NavLink to="/" exact activeClassName="active-nav">
               <FontAwesomeIcon className="def-icon" icon={logo} />
               <FontAwesomeIcon className="act-icon" icon={logoActive} />
               &nbsp; ProjectName
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
           {/*Dropdown for settings/extra links*/}
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
           {/*}
           <li>
             <NavLink to="/notifications" id="noti-anchor" exact activeClassName="active-nav">
               <span id="noti-bell">
                 <FontAwesomeIcon className="def-icon" icon={bell} />
                 <FontAwesomeIcon className="act-icon" icon={bellActive} />
                 <div id="alert"></div>
               </span>
             </NavLink>}
           </li>
           {*/}
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
