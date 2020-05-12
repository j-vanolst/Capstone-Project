import React, { Component } from "react";
import AuthService from "../services/auth_service";

export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUser: AuthService.getCurrentUser()
        }
    }
    render() {
        const { currentUser } = this.state

        return (
            <div className="container">
                <div className="card card-container">
                    <div className="card-body">
                        <h1 class="card-title">Your Profile</h1>
                        <p>
                            <strong>Name: </strong>
                            {currentUser.fName} {currentUser.lName}
                        </p>
                        <p>
                            <strong>Email: </strong>
                            {currentUser.email}
                        </p>
                        <p>
                            <strong>Access Token: </strong>
                            {currentUser.accessToken}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}