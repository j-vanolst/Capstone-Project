import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import './camera.css'

import EditCameraModal from './edit_camera_modal.component'

const user = JSON.parse(localStorage.getItem('user'))

export default class EditCamera extends Component {
    constructor(props) {
        super(props)

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
                <Button variant="outline-primary" onClick={this.handleShow}>
                    Edit
                </Button>
                <EditCameraModal showModal={this.state.showModal} handleHide={this.handleHide} camera={this.props.camera} />
            </div>
        )
    }
}