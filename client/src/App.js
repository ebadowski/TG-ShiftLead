import './App.css';

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import {
  Header,
  Wrapper
} from './components/common';
import Login from './components/Login';
import {
AdminDashboard,
AdminInsight,
AdminMap,
AdminRoster
} from './components/Pages/Admin';
import {
  Floorplan
} from './components/Pages/User'



class App extends Component {
  state = {
    links: {
      admin: ['dashboard', 'roster', 'insight', 'map'],
      user: ['floorplan']
    },
    init: true,
    path: '',
    sessionToken: '',
    sessionUser: {},
    switchState: 'admin' // enums: ['admin', 'user', 'login', 'default']
  };


  componentDidMount() {

  }



  renderAdminRoutes = () => (
    <Router>
      {/* HEADER */}
      <Wrapper>
        <Switch>
          <Route
            exact
            path="/dashboard"
            render={() => (
              <AdminDashboard
                
              />
            )}
          />
          <Route
            exact
            path="/roster"
            render={() => (
              <AdminRoster
              />
            )}
          />
        </Switch>
      </Wrapper>
    </Router>
  );

  // Render user nav and routes
  renderUserRoutes = () => (
    <Router>
      {/* HEADER */}
      <Wrapper>
        <Switch>
          <Route
            exact
            path="/dashboard"
            render={() => (
               <Floorplan
               
               />
            )}
          />
        </Switch>
      </Wrapper>
    </Router>
  );

  render() {
    switch (this.state.switchState) {
      case 'admin':
        return this.renderAdminRoutes();
      case 'user':
        return this.renderUserRoutes();
      case 'login':
        return this.renderLoginRoutes();
      case 'default':
      default:
        return <></>;
    }
  }
};

export default App;

