import React, { Component } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { Redirect } from 'react-router-dom'

import "../form.css"

import { isEmail } from 'validator'
import AuthService from '../services/auth_service'

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

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.handleLogin = this.handleLogin.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)

        this.state = {
            email: '',
            password: '',
            loading: 'initial',
            message: '',
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
                    }
                })
        }
        else {
            this.setState({
                loading: 'false',
                authorized: false
            })
        }
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

    handleLogin(e) {
        e.preventDefault()

        this.setState({
            message: '',
            loading: 'true'
        })

        this.form.validateAll()

        if (this.checkBtn.context._errors.length === 0) {
            AuthService
                .login(this.state.email, this.state.password)
                .then(res => {
                    this.props.history.push('/dashboard')
                    window.location.reload()
                },
                    error => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString()

                        this.setState({
                            loading: 'false',
                            message: resMessage
                        })
                    })
        }
        else {
            this.setState({
                loading: 'false'
            })
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
        if (this.state.authorized) {
            return <Redirect to="/dashboard" />
        }
        return (
            <div className="container-md">
                <div className="login-form card card-container">
                    <div className="card-body">
                        <h1 className="card-title">Login</h1>
                        <Form
                            onSubmit={this.handleLogin}
                            ref={c => {
                                this.form = c
                            }}
                        >
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
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
                                    validations={[required]}
                                />
                                <a href="/reset">Forgot Password?</a>
                                <a className="register-link" href="/register">Register</a>
                            </div>

                            <div className="form-group">
                                <button className="btn btn-success btn-block">
                                    <span>Login</span>
                                </button>
                            </div>


                            {this.state.message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
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
            </div >
        )
    }
}