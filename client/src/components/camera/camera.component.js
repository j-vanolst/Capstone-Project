import React, { Component } from "react"

import "./camera.css"

import EditCamera from './edit_camera.component'

export default class Camera extends Component {
    constructor(props) {
        super(props)

        this.test = this.test.bind(this)

        this.state = {
            name: props.name,
            location: props.location,
            url: props.url
        }
    }

    test() {
        console.log('This is a camera')
    }

    render() {
        return (
            <div className="card card-camera-container" onClick={this.test}>
                <div className="card-body">
                    <h3 className="card-title">{this.state.name}</h3>
                    <p className="card-text">
                        <strong>Location: </strong>
                        {this.state.location}
                    </p>
                    <p className="card-text">
                        <strong>URL: </strong>
                        {this.state.url}
                    </p>
                    <EditCamera />
                </div>
            </div>
        )
    }
}