import React, { Component } from "react";
import "../video.css"


export default class Video extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filename: props.filename
        }
    }

    render() {
        return (
            <div className="card card-camera-container">
                <div className="card-body">
                    <h3 className="card-title">{this.state.filename}</h3>
                </div>
            </div>
        )
    }
}