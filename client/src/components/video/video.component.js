import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import './video.css'

export default class Video extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filename: props.filename
        }
    }

    render() {
        return (
            <div className="card card-video-container">
                <div className="card-body">
                    <h3 className="card-title">{this.state.filename}</h3>
                    <Button variant="danger">Delete</Button>
                </div>
            </div>
        )
    }
}