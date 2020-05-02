import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// Pages
import Home from './views/Home';
import Jobs from './views/Jobs'
import Bookmarks from './views/Bookmarks';
import Profile from './views/Profile';
import Settings from './views/Settings';
import Dashboard from './views/Dashboard';
import OrgProfile from './views/OrgProfile';
import MyListings from './views/MyListings';
import LogIn from './views/LogIn';
import Error from './views/Error';
import NewListing from './views/NewListing';
import JobPage from './views/JobPage';
import InitAccount from './views/InitAccount';
import Students from './views/Students';
import EditListing from "./views/EditListing";
import OrgSettings from "./views/OrgSettings";

// Components
import MasterNav from './components/MasterNav';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App" >
    <BrowserRouter>
        <MasterNav />
        <span style={{ height: "40vh" }} >
          <Switch>
            <Route exact={true} path='/' render={() => (
                <Home />
            )}/>
            <Route exact={true} path='/user-profile/:uid' render={({ match }) => (
                <Profile userID={match.params.uid} />
            )}/>
            <Route exact={true} path='/jobs' render={() => (
                <Jobs />
            )}/>
            <Route exact={true} path='/user-settings' render={() => (
                <Settings />
            )}/>
            <Route exact={true} path='/org-settings' render={() => (
                <OrgSettings />
                )}/>
            <Route exact={true} path='/bookmarks' render={() => (
                <Bookmarks />
            )}/>
            <Route exact={true} path='/my-listings' render={() => (
                <MyListings />
            )}/>
            <Route exact={true} path='/dashboard' render={() => (
                <Dashboard />
            )}/>
            <Route exact={true} path='/login' render={() => (
                <LogIn />
            )}/>
            <Route exact={true} path='/my-listings/new' render={() => (
                <NewListing />
            )}/>
            <Route exact={true} path='/my-listings/edit/:lid' render={({ match }) => (
                <EditListing listingID={match.params.lid} />
            )}/>
            <Route exact={true} path='/listing/:lid' render={({ match }) => (
                <JobPage listingID={match.params.lid} />
            )}/>
            <Route exact={true} path='/org/:oid' render={({ match }) => (
                <OrgProfile listingID={match.params.oid} />
            )}/>
            <Route exact={true} path='/signup' render={() => (
                <InitAccount />
            )}/>
            <Route exact={true} path='/recruit' render={() => (
                <Students />
            )}/>
            <Route component={Error} />
          </Switch>
        </span>
        <Footer id="footer" />
    </BrowserRouter>
  </div>
  );
}

export default App;
