import React, { Component } from 'react'
import { Link } from "react-router-dom";

import GetCompany from "../conf/company"
import AuthService from '../services/auth_service'

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this)

        this.state = {
            currentUser: undefined
        }
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser()

        if (user) {
            this.setState({
                currentUser: AuthService.getCurrentUser()
            })
        }
    }

    logout() {
        AuthService.logout()
    }

    render() {
        const { currentUser } = this.state

        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark main-nav">
                <Link to={"/"} className="navbar-brand">
                    {GetCompany()}
                </Link>
                <div className="navbar-nav mr-auto">

                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/dashboard"} className="nav-link">
                                Dashboard
                            </Link>
                        </li>
                    )}
                </div>
                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.fName} {currentUser.lName}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={this.logout}>
                                Logout
                            </a>
                        </li>
                    </div>
                ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Register
                                </Link>
                            </li>
                        </div>
                    )}
            </nav>
        )
    }
}

