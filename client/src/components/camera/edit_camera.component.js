import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

import './camera.css'

import { isURL } from 'validator'
import AuthService from '../../services/auth_service'
import CameraService from '../../services/camera_service'

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
// Mock Camera Class for testing
class MockCamera {
    constructor(name, location, url, startTime, endTime) {
        this.name = name
        this.location = location
        this.url = url
        this.startTime = startTime
        this.endTime = endTime
    }
    getName() {
        return this.name
    }
    getLocation() {
        return this.name
    }
    getURL() {
        return this.url
    }
    getSchedule() {
        return {
            startTime: this.startTime,
            endTime: this.endTime
        }
    }
}

const user = JSON.parse(localStorage.getItem('user'))

export default class EditCamera extends Component {
    constructor(props) {
        super(props)

        this.handleEditCamera = this.handleEditCamera.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeLocation = this.onChangeLocation.bind(this)
        this.onChangeURL = this.onChangeURL.bind(this)
        this.onChangeStartTime = this.onChangeStartTime.bind(this)
        this.onChangeEndTime = this.onChangeEndTime.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleHide = this.handleHide.bind(this)

        this.state = props.state
        this.state.showModal = false
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

    onChangeStartTime(e) {
        this.setState({
            startTime: e.target.value
        })
    }

    onChangeEndTime(e) {
        this.setState({
            endTime: e.target.value
        })
    }

    handleEditCamera(e) {
        e.preventDefault()

        this.form.validateAll()

        if (this.checkBtn.context._errors.length === 0) {
            CameraService
                .edit(this.state.name,
                    this.state.location,
                    this.state.url,
                    this.state.startTime,
                    this.state.endTime,
                    this.state.cameraID,
                    user.id)
            window.location.reload()
        }
        else {
            //Dont do stuff
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
    render() {
        return (
            <div>
                <Button variant="info" onClick={this.handleShow}>
                    Edit
                </Button>

                <Modal show={this.state.showModal} onHide={this.handleHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Camera</Modal.Title>
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

                            <div className="form-group">
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
                            </div>

                            {this.state.message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.message}
                                    </div>
                                </div>
                            )}

                            <CheckButton
                                style={{ display: "none" }}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            />
                            {/* <Input
                                type="text"
                                name="cameraID"
                                value={this.state.cameraID}
                                style={{ display: "none" }}
                            />
                            <Input
                                type="text"
                                name="userID"
                                value={user.id}
                                style={{ display: "none" }}
                            /> */}

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="info" onClick={this.handleEditCamera}>Save</Button>
                        <Button variant="secondary" onClick={this.handleHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}