import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

import './video.css'

import VideoService from '../../services/video_service'

const user = JSON.parse(localStorage.getItem('user'))

export default class Video extends Component {
    constructor(props) {
        super(props)

        this.remove = this.remove.bind(this)

        this.state = {
            fileID: props.fileID,
            filename: props.filename
        }
    }

    remove() {
        VideoService
            .remove(this.state.fileID, user.id)
        window.location.reload()
    }

    render() {
        return (
            <div className="card card-video-container">
                <div className="card-body">
                    <h3 className="card-title">{this.state.filename}</h3>
                    <Button variant="danger" onClick={this.remove}>Remove</Button>
                </div>
            </div>
        )
    }
}