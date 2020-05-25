import React, { Component, createRef } from 'react'
import { Button } from 'react-bootstrap'

import './video.css'

import VideoStream from './video_stream.component'
import VideoService from '../../services/video_service'

const user = JSON.parse(localStorage.getItem('user'))

export default class Video extends Component {
    constructor(props) {
        super(props)

        this.streamRef = React.createRef()

        this.remove = this.remove.bind(this)
        this.showStream = this.showStream.bind(this)

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

    showStream() {
        this.streamRef.current.handleShow()
    }

    render() {
        return (
            <div className="card card-video-container" onClick={this.showStream}>
                <div className="card-body">
                    <h3 className="card-title">{this.state.filename}</h3>
                    <Button variant="danger" onClick={this.remove}>Remove</Button>
                    <VideoStream ref={this.streamRef} fileID={this.state.fileID} />
                </div>
            </div>
        )
    }
}