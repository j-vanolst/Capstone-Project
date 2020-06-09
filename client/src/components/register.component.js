import React, { Component } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

import "../form.css"

import { isEmail } from 'validator'
import AuthService from '../services/auth_service'

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vname = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The first name must be between 3 and 20 characters.
            </div>
        )
    }
}

const vpassword = value => {
    if (value.length < 8 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 8 and 40 characters.
            </div>
        )
    }
}

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.handleRegister = this.handleRegister.bind(this)
        this.onChangeFName = this.onChangeFName.bind(this)
        this.onChangeLName = this.onChangeLName.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this)

        this.state = {
            fName: '',
            lName: '',
            email: '',
            password: '',
            confirmPassword: '',
            successful: false,
            message: '',
            passwordsMatch: false

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

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangeConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        })
    }

    handleRegister(e) {
        e.preventDefault()

        this.setState({
            message: '',
            successful: false
        })

        this.form.validateAll()

        // Check Passwords Match
        if (this.state.password === this.state.confirmPassword) {
            if (this.checkBtn.context._errors.length === 0) {
                AuthService
                    .register(
                        this.state.fName,
                        this.state.lName,
                        this.state.email,
                        this.state.password)
                    .then(res => {
                        this.setState({
                            message: res.message,
                            successful: true
                        })
                    },
                        error => {
                            const resMessage =
                                (error.response &&
                                    error.response.data &&
                                    error.response.data.message) ||
                                error.message ||
                                error.toString()

                            this.setState({
                                successful: false,
                                message: resMessage
                            })
                        })
            }
        }
        else {
            this.setState({
                successful: false,
                message: 'Passwords do not match.'
            })
        }
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="login-form card card-container">
                    <div className="card-body">
                        <h1 className="card-title">Register</h1>
                        <Form
                            onSubmit={this.handleRegister}
                            ref={c => {
                                this.form = c
                            }}
                        >
                            {!this.state.successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="fName">First Name</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="fName"
                                            value={this.state.fName}
                                            onChange={this.onChangeFName}
                                            validations={[required, vname]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="lName">Last Name</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="lName"
                                            value={this.state.lName}
                                            onChange={this.onChangeLName}
                                            validations={[required, vname]}
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
                                            validations={[required, email]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChangePassword}
                                            validations={[required, vpassword]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <Input
                                            type="password"
                                            className="form-control"
                                            name="confirmPassword"
                                            value={this.state.confirmPassword}
                                            onChange={this.onChangeConfirmPassword}
                                            validations={[required, vpassword]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-success btn-block">Register</button>
                                    </div>
                                </div>
                            )}

                            {this.state.message && (
                                <div className="form-group">
                                    <div
                                        className={
                                            this.state.successful
                                                ? "alert alert-success"
                                                : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {this.state.message}
                                    </div>
                                </div>
                            )}

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