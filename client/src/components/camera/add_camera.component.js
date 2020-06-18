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


import AddCameraModal from './add_camera_modal.component'

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
                <button onClick={this.handleShow} className="btn btn-link btn-add-camera">
                    Add Camera
                </button>
                <AddCameraModal showModal={this.state.showModal} handleHide={this.handleHide} />
            </div >
        )
    }
}