import { Component } from "react";

class Login extends Component {
    constructor() {
        super()
        this.state = {
            message: 'Loading...'
        }
    }
    componentDidMount() {
        fetch('/login')
            .then
    }
}