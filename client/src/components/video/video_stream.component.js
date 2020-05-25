import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

import './video.css'

const API_URL = 'http://localhost:9000/api/video/getFile/'

export default class VideoStream extends Component {

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
        console.log(API_URL + this.props.fileID)
    }

    handleHide() {
        this.setState({
            showModal: false
        })
    }

    render() {
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.handleHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Video Stream</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            <video src={API_URL + this.props.fileID} height="320" width="480" controls />
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

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}