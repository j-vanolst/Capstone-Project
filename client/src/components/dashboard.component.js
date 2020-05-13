import React, { Component } from "react"
import { Button } from 'react-bootstrap'
import Form from 'react-validation/build/form'

import Camera from "./camera/camera.component"
import AddCamera from "./camera/add_camera.component"
import Video from "../components/video/video.component"
import AuthService from "../services/auth_service"
import CameraService from "../services/camera_service"

const user = JSON.parse(localStorage.getItem('user'))

export default class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            cameras: []
        }
    }

    componentDidMount() {
        CameraService
            .get(user.id)
            .then((res) => {
                this.setState({
                    cameras: res.data.cameras
                })
            })

    }


    render() {
        const { currentUser } = this.state
        console.log(this.state.cameras[0])

        const cameras = []

        for (let aCamera of this.state.cameras) {
            cameras.push(<Camera name={aCamera.name} location={aCamera.location} url={aCamera.url} />)
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