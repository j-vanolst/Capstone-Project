import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import Login from './Components/Login'

class App extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                </ul>

                <Switch>
                    <Route path="/login" component={Login}></Route>
                </Switch>
            </div>
        )
    }
}

export default App