import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import { isEmail } from 'validator'

import AuthService from '../services/auth_service'
import UserService from '../services/user_service'

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        )
    }
}

const user = JSON.parse(localStorage.getItem('user'))

export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.handleUpdateProfile = this.handleUpdateProfile.bind(this)
        this.onChangeFName = this.onChangeFName.bind(this)
        this.onChangeLName = this.onChangeLName.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.toggleEditable = this.toggleEditable.bind(this)

        let currentUser = AuthService.getCurrentUser()

        this.state = {
            fName: currentUser.fName,
            lName: currentUser.lName,
            email: currentUser.email,
            password: '',
            readOnly: true,
            notificationTitle: 'Error',
            message: 'Error',
            notificationType: 'danger'
        }
    }

    handleUpdateProfile(e) {
        e.preventDefault()

        this.form.validateAll()

        if (this.checkBtn.context._errors.length === 0) {
            console.log('test')
            if (user && user.id) {
                UserService
                    .edit(this.state.fName,
                        this.state.lName,
                        this.state.email,
                        user.id)
                    .then(res => {
                        if (res) {
                            this.setState({
                                notificationTitle: 'Success',
                                message: res.message,
                                notificationType: 'success'
                            })
                        }
                        else {
                            this.setState({
                                notificationTitle: 'Error',
                                message: 'Error',
                                notificationType: 'danger'
                            })
                        }
                        // Add notification
                        let notification = {
                            title: this.state.notificationTitle,
                            message: this.state.message,
                            type: this.state.notificationType,
                            insert: 'top',
                            container: 'top-center',
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "fadeOut"],
                            dismiss: {
                                duration: 3000,
                                onScreen: true
                            }
                        }
                        store.addNotification(notification)

                        // Update LocalStorage
                        localStorage.setItem('user', JSON.stringify({
                            id: user.id,
                            fName: this.state.fName,
                            lName: this.state.lName,
                            email: this.state.email,
                            token: user.accessToken
                        }))

                        setTimeout(() => {
                            window.location.reload()
                        }, 2000)
                    })
            }
        }
    }

    onChangeFName(e) {
        this.setState({
            fName: e.target.value
        })
    }

    onChangeLName(e) {
        this.setState({
            lName: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    toggleEditable() {
        this.setState({
            readOnly: !this.state.readOnly
        })
    }

    render() {
        return (
            <div className="container">
                <div className="card card-container">
                    <div className="card-body">
                        <h1 className="card-title">Your Profile</h1>
                        <Form
                            onSubmit={this.handleUpdateProfile}
                            ref={c => {
                                this.form = c
                            }}
                        >
                            <div className="form-group">
                                <label htmlFor="fName">First Name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="fName"
                                    value={this.state.fName}
                                    onChange={this.onChangeFName}
                                    readOnly={this.state.readOnly}
                                    validations={[required]}
                                />
                                <label htmlFor="lname">Last Name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="lName"
                                    value={this.state.lName}
                                    onChange={this.onChangeLName}
                                    readOnly={this.state.readOnly}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    readOnly={this.state.readOnly}
                                    validations={[required, email]}
                                />
                            </div>

                            <div className="profile-buttons">
                                <Button variant="success" onClick={this.handleUpdateProfile}>Save</Button>
                                <Button variant="info" onClick={this.toggleEditable}>Edit</Button>
                                <a href="/changePassword" className="btn btn-warning">Change Password</a>
                            </div>

                            <CheckButton
                                style={{ display: "none" }}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            />

                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}