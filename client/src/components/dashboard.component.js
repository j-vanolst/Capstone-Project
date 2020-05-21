import React, { Component } from "react"
import { Button } from 'react-bootstrap'
import Form from 'react-validation/build/form'

import Camera from "./camera/camera.component"
import AddCamera from "./camera/add_camera.component"
import Video from "../components/video/video.component"
import AddVideo from '../components/video/add_video.component'
import AuthService from "../services/auth_service"
import CameraService from "../services/camera_service"
import VideoService from '../services/video_service'
import Uploader from '../components/video/uploader.component'

const user = JSON.parse(localStorage.getItem('user'))

export default class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            cameras: [],
            videos: []
        }
    }

    componentDidMount() {
        if (user) {
            CameraService
                .get(user.id)
                .then((res) => {
                    this.setState({
                        cameras: res.data.cameras
                    })
                })

            VideoService
                .get(user.id)
                .then((res) => {
                    this.setState({
                        videos: res.data.videos
                    })
                })
        }
    }


    render() {
        const { currentUser } = this.state

        const cameras = []

        for (let aCamera of this.state.cameras) {
            cameras.push(<Camera cameraID={aCamera._id} name={aCamera.name} location={aCamera.location} url={aCamera.url} startTime={aCamera.startTime} endTime={aCamera.endTime} />)
        }

        const videos = []

        for (let aVideo of this.state.videos) {
            videos.push(<Video fileID={aVideo._id} filename={aVideo.filename} />)
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 dashboard-section">
                        <h1>My Cameras</h1>
                        <AddCamera />
                        <div>
                            {cameras}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 dashboard-section">
                        <h1>My Videos</h1>
                        <AddVideo />
                        <div>
                            {videos}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 dashboard-section">
                        <h1>Metrics</h1>
                        <h3>This feature is not implemented.</h3>
                    </div>
                </div>
            </div>
        )
    }
}