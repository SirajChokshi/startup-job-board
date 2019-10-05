import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

// Pages
import Home from './views/Home';
import Jobs from './views/Jobs'
import Bookmarks from './views/Bookmarks';
import Profile from './views/Profile';
import Settings from './views/Settings';

// Components
import Nav from './components/Nav';
import NavAdmin from './components/NavAdmin';
import Footer from './components/Footer';

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
          <Route exact={true} path='/Bookmarks' render={() => (
              <Bookmarks />
          )}/>
        <Footer />
    </BrowserRouter>
  </div>
  );
}

export default App;
