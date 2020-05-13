import React, { Component } from "react";
import Form from 'react-validation/build/form'

import Camera from "./camera/camera.component"
import AddCamera from "./camera/add_camera.component"
import Video from "../components/video/video.component"
import AuthService from "../services/auth_service";


export default class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUser: AuthService.getCurrentUser()
        }
    }
    render() {
        const { currentUser } = this.state

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 dashboard-section">
                        <h1>My Cameras</h1>
                        <AddCamera />
                        <Camera name="Test Cam" location="Mt Pleasant" url="rtsp://testcam.com" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 dashboard-section">
                        <h1>My Videos</h1>
                        <Video filename="test.mp4"></Video>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 dashboard-section">
                        <h1>Metrics</h1>
                    </div>
                </div>
            </div>
        )
    }
}