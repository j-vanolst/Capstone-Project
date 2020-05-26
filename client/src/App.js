import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css";


import Navigation from './components/navigation.component'
import Login from './components/login.component'
import Register from './components/register.component'
import Dashboard from './components/dashboard.component'
import Profile from './components/profile.component'
import Reset from './components/reset.component'
import ResetPassword from './components/reset-password.component'
import Test from './components/test.component'

import Canvas from './components/canvas/canvas.component'


class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Navigation></Navigation>

                    <div className="container mt-3">
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/reset" component={Reset} />
                            <Route path="/reset/:token" component={ResetPassword} />
                            <Route exact path="/dashboard" component={Dashboard} />
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/canvas" component={Canvas} />
                            <Route exact path="/test" component={Test} />
                        </Switch>
                    </div>
                </div>
            </Router >
        )
    }
}

export default App