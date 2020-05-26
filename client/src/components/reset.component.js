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

export default class Reset extends Component {
    constructor(props) {
        super(props)

        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.handleReset = this.handleReset.bind(this)

        this.state = {
            email: '',
            loading: false,
            message: ''
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    handleReset(e) {
        e.preventDefault()

        this.setState({
            message: '',
            loading: true
        })

        this.form.validateAll()

        if (this.checkBtn.context._errors.length === 0) {
            AuthService
                .reset(this.state.email)
        }
        else {
            this.setState({
                loading: false
            })
        }
    }

    render() {
        return (
            <div className="container-md">
                <div className="card card-container">
                    <div className="card-body">
                        <h1 className="card-title">Reset Password</h1>
                        <Form
                            onSubmit={this.handleReset}
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
                                <button className="btn btn-success btn-block">Reset</button>
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