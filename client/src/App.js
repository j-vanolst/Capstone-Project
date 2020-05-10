import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css";

import Login from './components/login.component'
import Register from './components/register.component'


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div className="container mt-3">
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App