import React, { Component, createRef } from 'react'
import { Modal, Button } from 'react-bootstrap'

import './camera.css'


import AddCameraForm from './add_camera_form.component'
import Scheduler from '../widgets/scheduler.component'

export default class AddCameraModal extends Component {
    constructor(props) {
        super(props)

        this.formRef = createRef()
        this.scheduleRef = createRef()

        this.addCamera = this.addCamera.bind(this)
    }

    addCamera() {
        let form = this.formRef.current
        let schedule = this.scheduleRef.current

        let camera = form.getInput()
        camera.schedule = schedule.getInput()

        console.log(JSON.stringify(camera.schedule))
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