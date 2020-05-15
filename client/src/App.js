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
import API from './utils/API'
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
        switchState: 'default' // enums: ['admin', 'user', 'login', 'default']
    };


    componentDidMount() {
        const sessionToken = localStorage.getItem('sessionid');
        const state = {};
        state.init = false; // Allow original path to be stored in state by avoiding redirect after initial render
        state.path = window.location.pathname;

        if (sessionToken) {
            this.getSessionUser(sessionToken);
            state.sessionToken = sessionToken;
        } else {
            state.switchState = 'login';
        }

        this.setState(state);
    }


    // Retrieve user if session token exists
    getSessionUser = sessionToken => {
        API.getSession(sessionToken)
            .then(res =>
                this.setState({
                    sessionUser: res.data,
                    switchState: res.data.role
                })
            )
            .catch(err => {
                console.log(err);

                this.setState({
                    switchState: 'login'
                });
            });
    };

    // Event handler to update state on login
    handleLogin = user => {
        this.setState({
            sessionToken: localStorage.getItem('sessionid'),
            sessionUser: user,
            switchState: user.role
        });
    };
    handleLogout = () => {
        API.logout()
          .then(res => {
            localStorage.removeItem('sessionid');
            this.setState({
              sessionUser: {},
              switchState: 'login'
            });
          })
          .catch(err => console.log(err));
      };

    // Render login route
    renderLoginRoutes = () => (
        <Router>
            <Header />
            <Wrapper>
                <Switch>
                    <Route
                        exact
                        path="/login"
                        render={() => <Login login={this.handleLogin} />}
                    />
                    <Route render={() => <Redirect to="/login" />} />
                </Switch>
            </Wrapper>
        </Router>
    );

    //Render Admin Routes
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

