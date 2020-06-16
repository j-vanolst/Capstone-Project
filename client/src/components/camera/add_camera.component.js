import React, { Component, createRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import './camera.css'

import { isURL } from 'validator'
import CameraService from '../../services/camera_service'
import Scheduler from '../widgets/scheduler.component'

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

const url = value => {
    if (!isURL(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid URL.
            </div>
        )
    }
}

const user = JSON.parse(localStorage.getItem('user'))

export default class AddCamera extends Component {
    constructor(props) {
        super(props)


        this.schedulerRef = createRef()

        this.handleAddCamera = this.handleAddCamera.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeLocation = this.onChangeLocation.bind(this)
        this.onChangeURL = this.onChangeURL.bind(this)
        // this.onChangeStartTime = this.onChangeStartTime.bind(this)
        // this.onChangeEndTime = this.onChangeEndTime.bind(this)
        this.onChangeSchedule = this.onChangeSchedule.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleHide = this.handleHide.bind(this)
        this.handleScheduleShow = this.handleScheduleShow.bind(this)
        this.handleScheduleHide = this.handleScheduleHide.bind(this)

        this.state = {
            name: '',
            location: '',
            url: '',
            startTime: '',
            endTime: '',
            showModal: false,
            notificationTitle: 'Error',
            message: 'Error',
            notificationType: 'danger',
            showScheduleModal: false
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeLocation(e) {
        this.setState({
            location: e.target.value
        })
    }

    onChangeURL(e) {
        this.setState({
            url: e.target.value
        })
    }

    // onChangeStartTime(e) {
    //     this.setState({
    //         startTime: e.target.value
    //     })
    // }

    // onChangeEndTime(e) {
    //     this.setState({
    //         endTime: e.target.value
    //     })
    // }

    onChangeSchedule() {
        let scheduler = this.schedulerRef.current
        this.setState({
            schedule: scheduler.toJSON()
        })
        console.log(this.state.schedule)
        this.handleScheduleHide()
    }

    handleAddCamera(e) {
        e.preventDefault()

        this.form.validateAll()

        if (this.checkBtn.context._errors.length === 0) {
            if (user && user.id) {
                CameraService
                    .add(this.state.name,
                        this.state.location,
                        this.state.url,
                        this.state.startTime,
                        this.state.endTime,
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
    }

    handleShow() {
        this.setState({
            showModal: true
        })
    }

    handleHide() {
        this.setState({
            showModal: false
        })
    }

    handleScheduleShow() {
        this.setState({
            showScheduleModal: true,
        })
    }

    handleScheduleHide() {
        this.setState({
            showScheduleModal: false,
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.handleShow} className="btn btn-link btn-add-camera">
                    Add Camera
                </button>

                <Modal show={this.state.showModal} onHide={this.handleHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Camera</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form
                            onSubmit={this.handleAddCamera}
                            ref={c => {
                                this.form = c
                            }}
                        >
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="location">Location</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChangeLocation}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="url">URL</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="url"
                                    value={this.state.url}
                                    onChange={this.onChangeURL}
                                    validations={[required, url]}
                                />
                            </div>

                            {/* <div className="form-group">
                                <label htmlFor="schedule">Schedule</label>
                                <Input
                                    type="time"
                                    className="form-control"
                                    name="startTime"
                                    value={this.state.startTime}
                                    onChange={this.onChangeStartTime}
                                    validations={[required]}
                                />
                                <Input
                                    type="time"
                                    className="form-control"
                                    name="endTime"
                                    value={this.state.endTime}
                                    onChange={this.onChangeEndTime}
                                    validations={[required]}
                                />
                            </div> */}
                            <button onClick={this.handleScheduleShow} className="btn btn-outline-success">
                                Add Schedule
                            </button>
                            <Modal show={this.state.showScheduleModal} onHide={this.handleScheduleHide}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Schedule</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <Scheduler ref={this.schedulerRef} />
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button variant="success" onClick={this.onChangeSchedule} className="mx-auto btn-modal-add-camera">Add</Button>
                                    <Button variant="secondary" onClick={this.handleScheduleHide}>Close</Button>
                                </Modal.Footer>
                            </Modal>

                            <CheckButton
                                style={{ display: "none" }}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            />
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="success" onClick={this.handleAddCamera} className="mx-auto btn-modal-add-camera">Add</Button>
                        <Button variant="secondary" onClick={this.handleHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}