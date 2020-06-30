import React, { Component, createRef } from 'react'
import { Modal, Button } from 'react-bootstrap'

import './camera.css'

import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import AddCameraForm from './add_camera_form.component'
import Scheduler from '../widgets/scheduler.component'

import CameraService from '../../services/camera_service'

const user = JSON.parse(localStorage.getItem('user'))

export default class AddCameraModal extends Component {
    constructor(props) {
        super(props)

        this.formRef = createRef()
        this.scheduleRef = createRef()

        this.addCamera = this.addCamera.bind(this)

        this.state = ({
            camera: null,
            notificationTitle: '',
            message: '',
            notificationType: ''
        })
    }

    addCamera() {
        let form = this.formRef.current
        let schedule = this.scheduleRef.current

        // Check Inputs
        let checkInput = form.checkInput()
        let checkSchedule = schedule.checkInput()

        if (checkInput && checkSchedule) {
            if (user && user.id) {
                let camera = form.getInput()
                camera.schedule = schedule.getInput()
                CameraService
                    .add(camera.name,
                        camera.location,
                        camera.url,
                        JSON.stringify(camera.schedule),
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
                    <Modal.Title>Add Camera</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <AddCameraForm ref={this.formRef} />
                    <h4>Schedule</h4>
                    <hr></hr>
                    <Scheduler ref={this.scheduleRef} />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" onClick={this.addCamera} className="mx-auto btn-modal-add-camera">Add Camera</Button>
                    <Button variant="secondary" onClick={this.props.handleHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}