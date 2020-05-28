import React, { Component } from 'react'
import Form from 'react-validation/build/form'
import CheckButton from 'react-validation/build/button'

import "../form.css"

import AuthService from '../services/auth_service'

export default class Reset extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: '',
            successful: false
        }
    }

    componentDidMount() {
        AuthService
            .verifyToken(this.props.match.params.token)
            .then((res) => {
                console.log(res)
                if (res) {
                    this.setState({
                        message: res.message,
                        successful: res.successful
                    })
                }
                else {
                    this.setState({
                        message: 'Server Error.',
                        successful: false
                    })
                }

            })
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
            </div >
        )
    }
}