import React, { Component } from 'react'
import Input from 'react-validation/build/input'

import VideoService from '../../services/video_service'

const user = JSON.parse(localStorage.getItem('user'))

export default class Uploader extends Component {
    constructor(props) {
        super(props)

        this.onChangeFile = this.onChangeFile.bind(this)
        this.uploadFile = this.uploadFile.bind(this)

        this.state = {
            filename: '',
            file: ''
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

    uploadFile(e) {
        VideoService.add(this.state.filename, user.id, this.state.file)
    }

    render() {
        return (
            <div>
                <label htmlFor={this.props.name}>{this.props.labelText}</label>
                <Input
                    type="file"
                    className="form-control"
                    name={this.props.name}
                    onChange={this.onChangeFile}
                />
            </div>
        )
    }
}