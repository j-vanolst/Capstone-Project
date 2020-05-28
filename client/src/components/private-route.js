import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

// export default function PrivateRoute({ component: Component, ...rest }) => (
//     <Route {...rest} render={(props) => (
//         authenticated === true
//             ? <Component {...props} />
//             : <Redirect to='/login' />
//     )} />
// )


export default class PrivateRoute extends Component {
    constructor(props) {
        super(props)

        console.log(this.props)
    }

    render() {
        if (this.props.authenticated === true) {
            return (
                <Route exact path={this.props.path} component={this.props.component} />
            )
        }
        let component = <Redirect to='/login' />
        return (
            component
        )
    }
}
// export default class PrivateRoute extends Component {
//     constructor(props) {
//         super(props)

//     }

//     render() {
//         return (
//             <Route
//         )
//     }

// }


