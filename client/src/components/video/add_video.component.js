import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

import './video.css'

import Uploader from './uploader.component'
import VideoService from '../../services/video_service'

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

export default class AddVideo extends Component {
    constructor(props) {
        super(props)

        //this.handleAddVideo = this.handleAddVideo.bind(this)
        // this.onChangeFile = this.onChangeFile.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleHide = this.handleHide.bind(this)

        this.state = {
            filename: '',
            file: '',
            showModal: false
        }
    }

    // onChangeFile(e) {
    //     let files = e.target.files
    //     if (files.length) {
    //         this.setState({
    //             filename: files[0].name
    //         })
    //     }
    // }

    // handleAddVideo(e) {
    //     e.preventDefault()

    //     this.form.validateAll()

    //     if (this.checkBtn.context._errors.length === 0) {
    //         VideoService
    //             .add(this.state.filename,
    //                 user.id)
    //     }
    //     else {
    //         //Dont do stuff
    //     }

    //     //window.location.reload()

    // }

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
                <a href="#" onClick={this.handleShow} className="add-video-button">
                    Add New Video
                </a>

                <Modal show={this.state.showModal} onHide={this.handleHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Video</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form
                            //onSubmit={this.handleAddVideo}
                            ref={c => {
                                this.form = c
                            }}
                        >
                            {/* <div className="form-group">
                                <label htmlFor="file">Video File</label>
                                <Input
                                    type="file"
                                    className="form-control"
                                    name="file"
                                    value={this.state.filename}
                                    onChange={this.onChangeFile}
                                    validations={[required]}
                                />
                            </div> */}
                            {/* <div className="form-group">
                                <label htmlFor="filename">Filename</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="filename"
                                    value={this.state.filename}
                                    onChange={this.onChangeFile}
                                    validations={[required]}
                                />
                            </div> */}
                            <div className="form-group">
                                <Uploader name="file" labelText="Video File" />
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
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="success">Add</Button>
                        <Button variant="secondary" onClick={this.handleHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}