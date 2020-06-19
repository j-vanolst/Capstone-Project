import React, { Component } from 'react'

import './video.css'

import AddVideoModal from './add_video_modal.component'

export default class AddVideo extends Component {
    constructor(props) {
        super(props)
        this.uploaderRef = React.createRef()

        this.handleShow = this.handleShow.bind(this)
        this.handleHide = this.handleHide.bind(this)

        this.state = {
            showModal: false
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
                <button onClick={this.handleShow} className="btn btn-link btn-add-video">
                    Add Video
                </button>
                <AddVideoModal showModal={this.state.showModal} handleHide={this.handleHide} />
                {/* <Modal show={this.state.showModal} onHide={this.handleHide}>
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
                </Modal> */}
            </div >
        )
    }
}