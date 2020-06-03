import React, { Component } from "react"

import Camera from "./camera/camera.component"
import AddCamera from "./camera/add_camera.component"
import Video from "../components/video/video.component"
import AddVideo from '../components/video/add_video.component'
import AuthService from "../services/auth_service"
import CameraService from "../services/camera_service"
import VideoService from '../services/video_service'


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
                .then(res => {
                    this.setState({
                        cameras: res.cameras
                    })
                })

            VideoService
                .get(user.id)
                .then(res => {
                    this.setState({
                        videos: res.videos
                    })
                })
        }
    }

    render() {
        const cameras = []

        for (let aCamera of this.state.cameras) {
            cameras.push(<Camera key={aCamera._id} cameraID={aCamera._id} name={aCamera.name} location={aCamera.location} url={aCamera.url} startTime={aCamera.startTime} endTime={aCamera.endTime} polygon={aCamera.polygon} model={aCamera.model} />)
        }

        const videos = []

        for (let aVideo of this.state.videos) {
            videos.push(<Video key={aVideo._id} videoID={aVideo._id} fileID={aVideo.fileID} filename={aVideo.filename} polygon={aVideo.polygon} model={aVideo.model} />)
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