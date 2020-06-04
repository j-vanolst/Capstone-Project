import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Form from 'react-validation/build/form'
import CheckButton from 'react-validation/build/button'

import './video.css'

import Uploader from './uploader.component'

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

export default class AddVideo extends Component {
    constructor(props) {
        super(props)
        this.uploaderRef = React.createRef()

        this.handleAddVideo = this.handleAddVideo.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleHide = this.handleHide.bind(this)

        this.state = {
            filename: '',
            file: '',
            showModal: false
        }
    }

    handleAddVideo(e) {
        e.preventDefault()

        this.form.validateAll()

        if (this.checkBtn.context._errors.length === 0) {
            this.uploaderRef.current.uploadFile()
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
                <button onClick={this.handleShow} className="btn btn-link btn-add-video">Add New Video</button>

                <Modal show={this.state.showModal} onHide={this.handleHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Video</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form
                            onSubmit={this.handleAddVideo}
                            ref={c => {
                                this.form = c
                            }}
                        >

                            <div className="form-group">
                                <Uploader ref={this.uploaderRef} name="file" labelText="Video File" validations={[required]} />
                            </div>

                            <CheckButton
                                style={{ display: "none" }}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            />
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="success" onClick={this.handleAddVideo} className="mx-auto btn-modal-add-video">Add</Button>
                        <Button variant="secondary" onClick={this.handleHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div >
        )
    }
}