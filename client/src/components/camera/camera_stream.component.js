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

const user = JSON.parse(localStorage.getItem('user'))

export default class CameraStream extends Component {
    constructor(props) {
        super(props)

        this.handleChangeModel = this.handleChangeModel.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleHide = this.handleHide.bind(this)

        this.state = {
            showModal: false,
            model: ''
        }
    }

    handleChangeModel(e) {
        this.setState({
            model: e.value.target
        })
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
                    Show
                </Button>

                <Modal show={this.state.showModal} onHide={this.handleHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Camera Stream</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form
                            onSubmit={this.handleAddCamera}
                            ref={c => {
                                this.form = c
                            }}
                        >
                            <div className="cameraStream">
                                <img
                                    src="https://f0.pngfuel.com/png/146/778/camera-logo-png-clip-art.png"
                                    alt="Camera Feed"
                                    width="400px"
                                >
                                </img>

                            </div>
                            <div className="form-group">
                                <label htmlFor="model">Model</label>
                                <select
                                    className="form-control"
                                    name="model"
                                    value={this.state.model}
                                    onChange={this.onChangeModel}
                                >
                                    <option value="ped">Pedestrian Counting</option>
                                    <option value="car">Car Counting</option>
                                    <option value="lpr">License Plate Recognition</option>
                                </select>
                            </div>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}