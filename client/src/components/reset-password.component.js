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
        console.log(props.match.params.token)
        console.log(this.props)

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

    componentDidMount() {
        AuthService
            .verifyToken(this.props.match.params.token)
            .then((res) => {
                this.setState({
                    message: res.data.message
                })
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
                .then((res) => {
                    this.setState({
                        message: res.data.message
                    })
                })
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
                        <h1 className="card-title">Password Reset</h1>
                        <Form
                            onSubmit={this.handleReset}
                            ref={c => {
                                this.form = c
                            }}
                        >
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