import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit as listingsActive, faBell as bellActive, faBuilding as userActive, faSearch as search, faCaretDown as darr, faAddressCard as studentsActive, faCommentAlt as logoActive } from '@fortawesome/free-solid-svg-icons'
import { faEdit as listings, faBell as bell, faBuilding as user, faAddressCard as students, faCommentAlt as logo } from '@fortawesome/free-regular-svg-icons'

export default class NavAdmin extends Component {
  state = {
  }

  render () {
      return (
        <nav>
          <ul>
            // Logo/Home Link
           <li>
             <NavLink to="/" exact activeClassName="active-nav">
               <FontAwesomeIcon className="def-icon" icon={logo} />
               <FontAwesomeIcon className="act-icon" icon={logoActive} />
               &nbsp; ProjectName
             </NavLink>
           </li>
           // Search Bar
           <li id="search-nav">
             <span id="nav-search-icon-wrapper">
               <FontAwesomeIcon icon={search} style={{verticalAlign: 'middle', color: '#8e8e8e', fontSize: 14 + 'px', marginBottom: 2.6 + 'px'}} />
             </span>
             <input type="text" placeholder={"Recruit a student..."} className="search" style={{color: '#8e8e8e'}}></input>
           </li>
           // Search for students/recruit
           <li>
             <NavLink to="/students" exact activeClassName="active-nav">
               <FontAwesomeIcon className="def-icon" icon={students} />
               <FontAwesomeIcon className="act-icon" icon={studentsActive} />
               &nbsp; Students
             </NavLink>
           </li>
           // This Startup's Listings
           <li>
             <NavLink to="/bookmarks" exact activeClassName="active-nav">
               <FontAwesomeIcon className="def-icon" icon={listings} />
               <FontAwesomeIcon className="act-icon" icon={listingsActive} />
               &nbsp; My Listings
             </NavLink>
           </li>
           // Dropdown for settings/extra links
           <li className="dropdown">
             <span id="nav-drop-link">
               <FontAwesomeIcon className="def-icon" icon={user} />
               <FontAwesomeIcon className="act-icon" icon={userActive} />
               &nbsp; Me &nbsp;
               <span className="dropdown-arr"><FontAwesomeIcon icon={darr} /></span>
             </span>
             <div className="dropdown-content">
               <NavLink to="/company-profile">Profile</NavLink>
               <NavLink to="/recruited">Recruited</NavLink>
               <NavLink to="/favorites">Favorites</NavLink>
               <hr></hr>
               <NavLink to="/company-settings">Settings</NavLink>
             </div>
           </li>
           // Notification area
           <li>
             <NavLink to="/notifications" id="noti-anchor" exact activeClassName="active-nav">
               <span id="noti-bell">
                 <FontAwesomeIcon className="def-icon" icon={bell} />
                 <FontAwesomeIcon className="act-icon" icon={bellActive} />
                 <div id="alert"></div>
               </span>
             </NavLink>
           </li>
          </ul>
        </nav>
      )
   }
}
