import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

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

const user = JSON.parse(localStorage.getItem('user'))

export default class ChangePassword extends Component {
    constructor(props) {
        super(props)

        this.onChangeCurrentPassword = this.onChangeCurrentPassword.bind(this)
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this)
        this.onChangeNewPasswordConfirm = this.onChangeNewPasswordConfirm.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)

        this.state = {
            currentPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
            notificationTitle: 'Error',
            message: 'Error',
            notificationType: 'danger'
        }
    }

    onChangeCurrentPassword(e) {
        this.setState({
            currentPassword: e.target.value
        })
    }

    onChangeNewPassword(e) {
        this.setState({
            newPassword: e.target.value
        })
    }

    onChangeNewPasswordConfirm(e) {
        this.setState({
            newPasswordConfirm: e.target.value
        })
    }

    handleChangePassword(e){ 
        e.preventDefault()

        this.form.validateAll()

        if (this.checkBtn.context._errors.length === 0) {
            if (user && user.id) {
                UserService
                    .changePassword(this.state.currentPassword,
                        this.state.newPassword,
                        this.state.newPasswordConfirm,
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

                        setTimeout(() => {
                            window.location.reload()
                        }, 2000)
                    })
            }
        }
    }

    render() {
        return (
            <div className="container">
                <div className="card card-container">
                    <div className="card-body">
                        <h1 className="card-title">Change Password</h1>
                        <Form
                            onSubmit={this.handleChangePassword}
                            ref={c => {
                                this.form = c
                            }}
                            >
                            <div className="form-group">
                                <label htmlFor="currentPassword">Current Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="currentPassword"
                                    value={this.state.currentPassword}
                                    onChange={this.onChangeCurrentPassword}
                                    validations={[required]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPassword">New Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="newPassword"
                                    value={this.state.newPassword}
                                    onChange={this.onChangeNewPassword}
                                    validations={[required]}
                                />
                                <label htmlFor="newPasswordConfirm">Confirm New Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="newPasswordConfirm"
                                    value={this.state.newPasswordConfirm}
                                    onChange={this.onChangeNewPasswordConfirm}
                                    validations={[required]}
                                />
                            </div>

                            <Button variant="success" onClick={this.handleChangePassword}>Change Password</Button>

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