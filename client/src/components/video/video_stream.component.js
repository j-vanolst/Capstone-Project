import React, { Component, createRef } from 'react'
import { Modal, Button } from 'react-bootstrap'

import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import Canvas from '../canvas/canvas.component'


import './video.css'
import VideoService from '../../services/video_service'

const API_URL = 'http://localhost:9000/api/video/getFile/'

const user = JSON.parse(localStorage.getItem('user'))

export default class VideoStream extends Component {

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
            VideoService
                .update(this.props.videoID, polygon, this.state.model, user.id)
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
                {/* <div>
                    <video src={API_URL + this.props.fileID} height="320" width="480" controls />
                </div> */}
                <div>
                    <Canvas ref={this.canvasRef} width={640} height={360} verticalCorrection={115} polygon={this.props.polygon} />
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
                <Button variant="success" onClick={this.handleUpdateModelAndPolygon}>Update</Button>
            </div>
        )
    }
}