import React, { Component } from 'react'

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css"

// Import Theme CSS
import './theme.css'

import AuthService from './services/auth_service'

import Navigation from './components/navigation.component'
import Login from './components/login.component'
import Register from './components/register.component'
import Dashboard from './components/dashboard.component'
import Profile from './components/profile.component'
import Reset from './components/reset.component'
import ResetPassword from './components/reset-password.component'
import ChangePassword from './components/change-password.component'
import Test from './components/test.component'
import PrivateRoute from './components/private-route'
import FrameCapture from './components/capture-frame.component'


class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: 'initial',
            authorized: false
        }
    }


    componentDidMount() {
        console.log('second')
        this.setState({
            loading: 'true'
        })

        const user = JSON.parse(localStorage.getItem('user'))
        if (user && user.id) {
            AuthService.confirmJWT(user.accessToken)
                .then(res => {
                    if (res) {
                        this.setState({
                            loading: 'false',
                            authorized: true
                        })
                    }
                    else {
                        this.setState({
                            loading: 'false',
                            authorized: false
                        })
                        localStorage.removeItem('user')
                    }
                })
        }
        else {
            this.setState({
                loading: 'false',
                authorized: false
            })
            localStorage.removeItem('user')
        }
    }

    render() {
        if (this.state.loading === 'initial') {
            console.log('first')
            return <h2>Initializing...</h2>
        }

        if (this.state.loading === 'true') {
            console.log('loading')
            return <h2>Loading...</h2>
        }

        return (
            <Router>
                <ReactNotification />
                <div>
                    <Navigation></Navigation>

                    <div className="container mt-3">
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/reset" component={Reset} />
                            <Route path="/reset/:token" component={ResetPassword} />
                            <PrivateRoute authenticated={this.state.authorized} path="/dashboard" redirect="/login" component={Dashboard} />
                            <PrivateRoute authenticated={this.state.authorized} path="/profile" redirect="/login" component={Profile} />
                            <PrivateRoute authenticated={this.state.authorized} path="/changePassword" redirect="/login" component={ChangePassword} />
                            <PrivateRoute authenticated={this.state.authorized} path="/test" redirect="/login" component={Test} />
                            <Route path="/capture" component={FrameCapture} />
                        </Switch>
                    </div>
                </div>
            </Router >
            // <div>
            //     <PrivateRoute path="/memes" component={Test} />
            // </div>
        )
    }
}

export default App