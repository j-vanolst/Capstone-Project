import React, { Component, createRef } from 'react'
import { Modal, Button } from 'react-bootstrap'

import './video.css'

import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import Scheduler from '../widgets/scheduler.component'

import VideoService from '../../services/video_service'

const user = JSON.parse(localStorage.getItem('user'))

export default class EditVideoModal extends Component {
    constructor(props) {
        super(props)

        this.scheduleRef = createRef()

        this.editVideo = this.editVideo.bind(this)

        this.state = {
            notificationTitle: '',
            message: '',
            notificationType: ''
        }
    }

    editVideo() {
        let schedule = this.scheduleRef.current

        // Check Inputs
        let checkSchedule = schedule.checkInput()

        if (checkSchedule) {
            if (user && user.id) {
                VideoService
                    .edit(this.props.videoID, JSON.stringify(schedule.getInput()), user.id)
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
                    <Modal.Title>Edit Video</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h4>Schedule</h4>
                    <hr></hr>
                    <Scheduler ref={this.scheduleRef} schedule={this.props.schedule} />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" onClick={this.editVideo} className="mx-auto btn-modal-add-camera">Edit Camera</Button>
                    <Button variant="secondary" onClick={this.props.handleHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}