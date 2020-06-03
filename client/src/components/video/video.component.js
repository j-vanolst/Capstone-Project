import React, { Component, createRef } from 'react'
import { Modal, Button } from 'react-bootstrap'

import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import './video.css'


import VideoStream from './video_stream.component'
import VideoService from '../../services/video_service'

const user = JSON.parse(localStorage.getItem('user'))

export default class Video extends Component {
    constructor(props) {
        super(props)

        this.streamRef = createRef()

        this.remove = this.remove.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleHide = this.handleHide.bind(this)

        this.state = {
            fileID: props.fileID,
            filename: props.filename,
            notificationTitle: 'Error',
            message: 'Error',
            notificationType: 'danger',
            showModal: false
        }

        this.toggle = false
    }

    remove() {
        if (user && user.id) {
            VideoService
                .remove(this.state.fileID, user.id)
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


    render() {
        return (
            <div className="card card-video-container">
                <div className="card-body" onClick={this.handleShow}>
                    <h3 className="card-title">{this.state.filename}</h3>
                    <Button variant="danger" onClick={this.remove}>Remove</Button>
                    <Modal show={this.state.showModal} onHide={this.handleHide} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Video Stream</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <VideoStream ref={this.streamRef} videoID={this.props.videoID} polygon={this.props.polygon} model={this.props.model} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleHide}>Close</Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            </div>
        )
    }
}