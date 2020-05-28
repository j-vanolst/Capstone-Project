import React, { Component } from 'react'
import Input from 'react-validation/build/input'

import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import VideoService from '../../services/video_service'

const user = JSON.parse(localStorage.getItem('user'))

export default class Uploader extends Component {
    constructor(props) {
        super(props)

        this.onChangeFile = this.onChangeFile.bind(this)
        this.uploadFile = this.uploadFile.bind(this)

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

    uploadFile(e) {
        if (user && user.id) {
            VideoService
                .add(this.state.filename, user.id, this.state.file)
                .then(res => {
                    if (res) {
                        this.setState({
                            notificationTitle: 'Success',
                            message: res.message,
                            notificationType: 'success'
                        })
                    }
                    else {
                        this.setState({
                            notificationTitle: 'Error',
                            message: 'Error',
                            notificationType: 'danger'
                        })
                    }
                    // Add notification
                    let notification = {
                        title: this.state.notificationTitle,
                        message: this.state.message,
                        type: this.state.notificationType,
                        insert: 'top',
                        container: 'top-center',
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 3000,
                            onScreen: true
                        }
                    }
                    store.addNotification(notification)
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                })
        }
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