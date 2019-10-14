import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

// Pages
import Home from './views/Home';
import Jobs from './views/Jobs'
import Bookmarks from './views/Bookmarks';
import Profile from './views/Profile';
import Settings from './views/Settings';
import Notifications from './views/Notifications';

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
    <div className="App">
    <BrowserRouter>
        <Nav />
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
        <Footer />
    </BrowserRouter>
  </div>
  );
}

export default App;
