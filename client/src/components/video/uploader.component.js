import React, { Component } from 'react'

import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import VideoService from '../../services/video_service'

const user = JSON.parse(localStorage.getItem('user'))

export default class Uploader extends Component {
    constructor(props) {
        super(props)

        this.onChangeFile = this.onChangeFile.bind(this)

        this.state = {
            filename: '',
            file: '',
            notificationTitle: 'Error',
            message: 'Error',
            notificationType: 'danger'
        }
    }

    onChangeFile(e) {
        let files = e.target.files

        if (files.length) {
            let file = files[0]
            this.setState({
                filename: file.name,
                file: file
            })
        }
    }

    render() {
        return (
            <div>
                <label htmlFor={this.props.name}>{this.props.labelText}</label>
                <input type="file" className="form-control" name={this.props.name} onChange={this.onChangeFile}></input>
            </div>
        )
    }
}