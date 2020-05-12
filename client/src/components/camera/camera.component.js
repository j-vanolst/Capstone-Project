import React, { Component } from "react";
import "./camera.css"


export default class Camera extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.name,
            location: props.location,
            url: props.url
        }
    }

    render() {
        return (
            <div className="card card-camera-container">
                <div className="card-body">
                    <h3 className="card-title">{this.state.name}</h3>
                    <p className="card-text">
                        <strong>Location: </strong>
                        {this.state.location}
                    </p>
                    <p className="card-text">
                        <strong>URL: </strong>
                        {this.state.url}
                    </p>
                </div>
            </div>
        )
    }
}