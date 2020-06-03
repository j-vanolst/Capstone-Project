import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

import Canvas from '../canvas/canvas.component'


import './video.css'

const API_URL = 'http://localhost:9000/api/video/getFile/'

export default class VideoStream extends Component {

    constructor(props) {
        super(props)

        this.onChangeModel = this.onChangeModel.bind(this)

        this.state = {
            model: ''
        }
    }

    onChangeModel(e) {
        this.setState({
            model: e.target.value
        })
    }

    render() {
        return (
            <div>
                {/* <div>
                    <video src={API_URL + this.props.fileID} height="320" width="480" controls />
                </div> */}
                <div>
                    <Canvas width={640} height={360} verticalCorrection={115} />
                </div>
                <div className="form-group">
                    <label htmlFor="model">Model</label>
                    <select
                        className="form-control"
                        name="model"
                        value={this.state.model}
                        onChange={this.onChangeModel}
                    >
                        <option value="ped">Pedestrian Counting</option>
                        <option value="car">Car Counting</option>
                        <option value="lpr">License Plate Recognition</option>
                    </select>
                </div>
            </div>
        )
    }
}