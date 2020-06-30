import React, { Component } from "react"

import Camera from "./camera/camera.component"
import Video from "../components/video/video.component"

import AddCameraModal from '../components/camera/add_camera_modal.component'
import AddVideoModal from '../components/video/add_video_modal.component'

import AuthService from "../services/auth_service"
import CameraService from "../services/camera_service"
import VideoService from '../services/video_service'


const user = JSON.parse(localStorage.getItem('user'))

export default class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.handleCameraShow = this.handleCameraShow.bind(this)
        this.handleCameraHide = this.handleCameraHide.bind(this)
        this.handleVideoShow = this.handleVideoShow.bind(this)
        this.handleVideoHide = this.handleVideoHide.bind(this)

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            cameras: [],
            videos: [],
            showVideoModal: false,
            showCameraModal: false
        }
    }

    componentDidMount() {
        if (user && user.id) {
            CameraService
                .get(user.id)
                .then(res => {
                    if (res) {
                        this.setState({
                            cameras: res.cameras
                        })
                    }
                })

            VideoService
                .get(user.id)
                .then(res => {
                    if (res) {
                        this.setState({
                            videos: res.videos
                        })
                    }
                })
        }
    }

    handleCameraShow() {
        this.setState({
            showCameraModal: true
        })
    }

    handleCameraHide() {
        this.setState({
            showCameraModal: false
        })
    }

    handleVideoShow() {
        this.setState({
            showVideoModal: true
        })
    }

    handleVideoHide() {
        this.setState({
            showVideoModal: false
        })
    }

    render() {
        const cameras = []
        for (let aCamera of this.state.cameras) {
            cameras.push(<Camera key={aCamera._id} cameraID={aCamera._id} name={aCamera.name} location={aCamera.location} url={aCamera.url} schedule={aCamera.schedule} polygon={aCamera.polygon} model={aCamera.model} camera={aCamera} />)
        }

        const videos = []

        for (let aVideo of this.state.videos) {
            videos.push(<Video key={aVideo._id} videoID={aVideo._id} fileID={aVideo.fileID} filename={aVideo.filename} polygon={aVideo.polygon} model={aVideo.model} schedule={aVideo.schedule} />)
        }

        return (
            <div className="container-lg">
                <div className="row">
                    <nav className="navbar nav-section">
                        <ul className="navbar-nav">
                            <h1 className="navbar-brand dashboard-header">My Cameras</h1>
                            <div className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <button className="btn btn-link btn-add-camera" onClick={this.handleCameraShow}>Add Camera</button>
                                </li>
                            </div>
                        </ul>
                    </nav>
                    <div className="col-md-12 dashboard-section">
                        <div className="cameras">
                            {cameras}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <nav className="navbar nav-section">
                        <ul className="navbar-nav">
                            <h1 className="navbar-brand dashboard-header">My Videos</h1>
                            <div className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <button className="btn btn-link btn-add-video" onClick={this.handleVideoShow}>Add Video</button>
                                </li>
                            </div>
                        </ul>
                    </nav>
                    <div className="col-md-12 dashboard-section">
                        <div className="videos">
                            {videos}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <nav className="navbar nav-section">
                        <ul className="navbar-nav">
                            <h1 className="navbar-brand dashboard-header">Metrics</h1>
                            <div className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <h3 className="metrics">This feature is not implemented.</h3>
                                </li>
                            </div>
                        </ul>
                    </nav>
                    <div className="col-md-12 dashboard-section">
                    </div>
                </div>
                <div>
                    <AddCameraModal showModal={this.state.showCameraModal} handleHide={this.handleCameraHide}></AddCameraModal>
                    <AddVideoModal showModal={this.state.showVideoModal} handleHide={this.handleVideoHide}></AddVideoModal>
                </div>
            </div >
        )
    }
}