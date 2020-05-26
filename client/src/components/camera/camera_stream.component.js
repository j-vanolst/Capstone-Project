import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Form from 'react-validation/build/form'

import './camera.css'

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

export default class CameraStream extends Component {
    constructor(props) {
        super(props)

        this.onChangeModel = this.onChangeModel.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleHide = this.handleHide.bind(this)

        this.state = {
            showModal: false,
            model: ''
        }
    }

    onChangeModel(e) {
        this.setState({
            model: e.target.value
        })
    }

    handleShow() {
        this.setState({
            showModal: true
        })
    }

    handleHide() {
        console.log('hide')
        this.setState({
            showModal: false
        })
    }
    render() {
        return (
            <div>
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
                                    validations={[required]}
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