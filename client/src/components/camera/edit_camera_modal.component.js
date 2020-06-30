import React, { Component, createRef } from 'react'
import { Modal, Button } from 'react-bootstrap'

import './camera.css'

import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import EditCameraForm from './edit_camera_form.component'
import Scheduler from '../widgets/scheduler.component'

import CameraService from '../../services/camera_service'

const user = JSON.parse(localStorage.getItem('user'))

export default class EditCameraModal extends Component {
    constructor(props) {
        super(props)

        this.formRef = createRef()
        this.scheduleRef = createRef()

        this.editCamera = this.editCamera.bind(this)

        this.state = ({
            notificationTitle: '',
            message: '',
            notificationType: ''
        })
    }

    editCamera() {
        let form = this.formRef.current
        let schedule = this.scheduleRef.current

        // Check Inputs
        let checkInput = form.checkInput()
        let checkSchedule = schedule.checkInput()

        if (checkInput && checkSchedule) {
            if (user && user.id) {
                let camera = form.getInput()
                camera.schedule = schedule.getInput()
                camera.cameraID = this.props.camera._id
                CameraService
                    .edit(camera.name,
                        camera.location,
                        camera.url,
                        JSON.stringify(camera.schedule),
                        camera.cameraID,
                        user.id)
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
                                message: res.message,
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
                    <Modal.Title>Edit Camera</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <EditCameraForm ref={this.formRef} camera={this.props.camera} />
                    <h4>Schedule</h4>
                    <hr></hr>
                    <Scheduler ref={this.scheduleRef} schedule={this.props.camera.schedule} />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" onClick={this.editCamera} className="mx-auto btn-modal-add-camera">Edit Camera</Button>
                    <Button variant="secondary" onClick={this.props.handleHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}