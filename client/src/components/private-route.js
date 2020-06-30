import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

export default class PrivateRoute extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.authenticated === true) {
            return (
                <Route exact path={this.props.path} component={this.props.component} />
            )
        }
        let component = <Redirect to={this.props.redirect} />
        return (
            component
        )
    }
}

