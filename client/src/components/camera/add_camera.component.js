import React, { Component } from 'react'

import './camera.css'

import AddCameraModal from './add_camera_modal.component'


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