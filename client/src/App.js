import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css";


import Navigation from './components/navigation.component'
import Login from './components/login.component'
import Register from './components/register.component'
import Dashboard from './components/dashboard.component'
import Profile from './components/profile.component'


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
                            <Route exact path="/dashboard" component={Dashboard} />
                            <Route exact path="/profile" component={Profile} />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App