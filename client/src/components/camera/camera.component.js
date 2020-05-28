import React, { Component } from "react"
import { Button } from 'react-bootstrap'

import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import "./camera.css"

import EditCamera from './edit_camera.component'
import CameraStream from './camera_stream.component'
import CameraService from '../../services/camera_service'


const user = JSON.parse(localStorage.getItem('user'))

export default class Camera extends Component {
    constructor(props) {
        super(props)

        this.streamRef = React.createRef()

        this.remove = this.remove.bind(this)
        this.showStream = this.showStream.bind(this)

        this.state = {
            cameraID: props.cameraID,
            name: props.name,
            location: props.location,
            url: props.url,
            startTime: props.startTime,
            endTime: props.endTime,
            cameraStream: '',
            notificationTitle: 'Error',
            message: 'Error',
            notificationType: 'danger'
        }
    }

    componentDidMount() {
        this.setState({
            cameraStream: this.refs.cameraStream
        })
    }

    remove() {
        if (user && user.id) {
            CameraService
                .remove(this.state.cameraID, user.id)
                .then(res => {
                    if (res) {
                        this.setState({
                            notificationTitle: 'Success',
                            message: res.message,
                            notificationType: 'success'
                        })
                    }
                    else {
                        this.setState({
                            notificationTitle: 'Error',
                            message: 'Error',
                            notificationType: 'danger'
                        })
                    }
                    // Add notification
                    let notification = {
                        title: this.state.notificationTitle,
                        message: this.state.message,
                        type: this.state.notificationType,
                        insert: 'top',
                        container: 'top-center',
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 3000,
                            onScreen: true
                        }
                    }
                    store.addNotification(notification)

                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                })
        }
    }

    showStream() {
        this.streamRef.current.handleShow()
    }

    render() {
        return (
            <div className="card card-camera-container">
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
                    <CameraStream ref={this.streamRef}></CameraStream>
                </div>
            </div>
        )
    }
}