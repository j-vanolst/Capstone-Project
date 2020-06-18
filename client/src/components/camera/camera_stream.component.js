import React, { Component, createRef } from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-validation/build/form'

import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import './camera.css'

import Canvas from '../canvas/canvas.component'

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

        this.canvasRef = createRef()

        this.onChangeModel = this.onChangeModel.bind(this)
        this.handleUpdateModelAndPolygon = this.handleUpdateModelAndPolygon.bind(this)

        this.state = {
            model: props.model,
            notificationTitle: 'Error',
            message: 'Error',
            notificationType: 'danger'
        }
        console.log(props.schedule)
    }

    onChangeModel(e) {
        this.setState({
            model: e.target.value
        })
    }

    handleUpdateModelAndPolygon() {
        if (user && user.id) {
            // Get the polygon points from the canvas
            let polygon = this.canvasRef.current.getPoints()
            if (polygon.length) {
                polygon = JSON.stringify(polygon)
            }
            else {
                polygon = ''
            }
            CameraService
                .update(this.props.cameraID, polygon, this.state.model, user.id)
                .then(res => {
                    if (res) {
                        this.setState({
                            notificationTitle: 'Success',
                            message: res.message,
                            notificationType: 'success'
                        })
                    }
                    else {
                        this.setState({
                            notificationTitle: 'Error',
                            message: 'Error',
                            notificationType: 'danger'
                        })
                    }
                    // Add notification
                    let notification = {
                        title: this.state.notificationTitle,
                        message: this.state.message,
                        type: this.state.notificationType,
                        insert: 'top',
                        container: 'top-center',
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 3000,
                            onScreen: true
                        }
                    }
                    store.addNotification(notification)

                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                })
        }
    }

    render() {
        return (
            <div>
                <Form
                    onSubmit={this.handleAddCamera}
                    ref={c => {
                        this.form = c
                    }}
                >
                    <div className="cameraStream">
                        <Canvas ref={this.canvasRef} width={640} height={360} verticalCorrection={115} polygon={this.props.polygon} />
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
            </div>
        )
    }
}