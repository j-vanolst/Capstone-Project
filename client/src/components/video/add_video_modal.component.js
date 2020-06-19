import React, { Component, createRef } from 'react'
import { Modal, Button } from 'react-bootstrap'

import './video.css'

import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

//import AddVideoForm from './add_video_form.component'
import Uploader from './uploader.component'
import Scheduler from '../widgets/scheduler.component'

import VideoService from '../../services/video_service'

const user = JSON.parse(localStorage.getItem('user'))

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

export default class AddVideoModal extends Component {
    constructor(props) {
        super(props)

        this.uploaderRef = createRef()
        this.scheduleRef = createRef()

        this.addVideo = this.addVideo.bind(this)

        this.setState({
            notificationTitle: '',
            message: '',
            notificationType: ''
        })
    }

    addVideo() {
        let uploader = this.uploaderRef.current
        let schedule = this.scheduleRef.current

        // Check Inputs
        let checkSchedule = schedule.checkInput()

        if (checkSchedule) {
            if (user && user.id) {
                VideoService
                    .add(uploader.state.filename, user.id, uploader.state.file, JSON.stringify(schedule.getInput()))
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

        if (!checkSchedule) {
            let notification = {
                title: 'Error',
                message: `Two or more instances of a the same day scheduled.`,
                type: 'danger',
                insert: 'top',
                container: 'top-center',
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            }
            store.addNotification(notification)
            return
        }
    }


    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.handleHide} size="md">
                <Modal.Header closeButton>
                    <Modal.Title>Add Video</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Uploader ref={this.uploaderRef} name="file" labelText="Video File" validations={[required]} />
                    <h4>Schedule</h4>
                    <hr></hr>
                    <Scheduler ref={this.scheduleRef} />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" onClick={this.addVideo} className="mx-auto btn-modal-add-camera">Add Camera</Button>
                    <Button variant="secondary" onClick={this.props.handleHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}