import React, { Component, createRef } from "react"
import { Modal, Button } from 'react-bootstrap'

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

        this.streamRef = createRef()

        this.remove = this.remove.bind(this)
        this.handleHide = this.handleHide.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleUpdateModelAndPolygon = this.handleUpdateModelAndPolygon.bind(this)

        this.state = {
            cameraID: props.cameraID,
            name: props.name,
            location: props.location,
            url: props.url,
            startTime: props.startTime,
            endTime: props.endTime,
            notificationTitle: 'Error',
            message: 'Error',
            notificationType: 'danger',
            showModal: false
        }
        this.toggle = false
    }

    componentDidMount() {
        // this.setState({
        //     cameraStream: this.refs.cameraStream.current
        // })
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

    handleHide() {
        this.toggle = true
        this.setState({
            showModal: false
        })
    }

    handleShow() {
        if (this.toggle) {
            this.toggle = false
            return
        }
        this.setState({
            showModal: true
        })
    }

    handleUpdateModelAndPolygon() {
        const cameraStream = this.streamRef.current
        cameraStream.handleUpdateModelAndPolygon()
    }

    render() {
        return (
            <div>
                <div className="card card-camera-container">
                    <div className="card-body" onClick={this.handleShow}>
                        <h3 className="card-title">{this.state.name}</h3>
                        <p className="card-text">
                            <strong>Location: </strong>
                            {this.state.location}
                        </p>
                        <p className="card-text">
                            <strong>URL: </strong>
                            {this.state.url}
                        </p>
                    </div>
                    <div className="card-footer">
                        <div className="camera-buttons">
                            <EditCamera state={this.state} />
                            <Button variant="outline-danger" onClick={this.remove}>Remove</Button>
                        </div>
                    </div>
                </div>
                <div>
                    <Modal show={this.state.showModal} onHide={this.handleHide} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Camera Stream</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <CameraStream ref={this.streamRef} cameraID={this.state.cameraID} handleHide={this.handleHide} polygon={this.props.polygon} model={this.props.model}></CameraStream>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={this.handleUpdateModelAndPolygon} className="mx-auto btn-update-camera-stream">Update</Button>
                            <Button variant="secondary" onClick={this.handleHide}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}