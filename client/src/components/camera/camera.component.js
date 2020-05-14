import React, { Component } from "react"
import { Button } from 'react-bootstrap'

import "./camera.css"

import EditCamera from './edit_camera.component'
import CameraService from '../../services/camera_service'


const user = JSON.parse(localStorage.getItem('user'))


export default class Camera extends Component {
    constructor(props) {
        super(props)

        this.test = this.test.bind(this)
        this.remove = this.remove.bind(this)

        this.state = {
            cameraID: props.cameraID,
            name: props.name,
            location: props.location,
            url: props.url,
            startTime: props.startTime,
            endTime: props.endTime
        }
    }

    test() {
        console.log(this.state)
    }

    remove() {
        CameraService
            .remove(this.state.cameraID, user.id)
        window.location.reload()
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
                    <EditCamera state={this.state} />
                    <Button variant="danger" onClick={this.remove}>Remove</Button>
                </div>
            </div>
        )
    }
}