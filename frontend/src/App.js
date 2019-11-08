import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// Pages
import Home from './views/Home';
import Jobs from './views/Jobs'
import Bookmarks from './views/Bookmarks';
import Profile from './views/Profile';
import Settings from './views/Settings';
import Notifications from './views/Notifications';
import Dashboard from './views/Dashboard';
import OrgProfile from './views/OrgProfile';
import MyListings from './views/MyListings';
import LogIn from './views/LogIn';
import Error from './views/Error';

// Components
import Nav from './components/Nav';
import NavAdmin from './components/NavAdmin';
import Footer from './components/Footer';

/*
 * TEMP: To switch between startup/student navigation bars just
 * change the <NavAdmin /> OR <Nav /> reques while we wait for
 * user auth to be prepared
 */

function App() {
  return (
    <div className="App" >
    <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact={true} path='/' render={() => (
              <Home />
          )}/>
          <Route exact={true} path='/user-profile' render={() => (
              <Profile />
          )}/>
          <Route exact={true} path='/jobs' render={() => (
              <Jobs />
          )}/>
          <Route exact={true} path='/user-settings' render={() => (
              <Settings />
          )}/>
          <Route exact={true} path='/bookmarks' render={() => (
              <Bookmarks />
          )}/>
          <Route exact={true} path='/notifications' render={() => (
              <Notifications />
          )}/>
          <Route exact={true} path='/edit-listings' render={() => (
              <MyListings />
          )}/>
          <Route exact={true} path='/company-profile' render={() => (
              <OrgProfile />
          )}/>
          <Route exact={true} path='/dashboard' render={() => (
              <Dashboard />
          )}/>
          <Route exact={true} path='/login' render={() => (
              <LogIn />
          )}/>
        <Route component={Error} />
        </Switch>
        <Footer id="footer" />
    </BrowserRouter>
  </div>
  );
}

export default App;
