import React, { Component, createRef } from 'react'


import VideoService from '../services/video_service'

export default class FrameCapture extends Component {
    constructor(props) {
        super(props)

        this.videoRef = createRef()
        this.canvasRef = createRef()
        this.imageRef = createRef()

        this.captureFrame = this.captureFrame.bind(this)

        this.state = {
            imageURL: ''
        }
    }

    componentDidMount() {
        const video = this.videoRef.current
        const canvas = this.canvasRef.current
        const image = this.imageRef.current

        let ctx = canvas.getContext('2d')

        //video.src = 'http://localhost:9000/api/video/getFile/5ee07c9b04bc130714c9b48b'
        video.src = VideoService.getFile('5ee07c9b04bc130714c9b48b')
        video.crossOrigin = 'anonymous'

        canvas.width = 640
        canvas.height = 360

        video.oncanplay = () => {
            this.captureFrame()
        }
    }

    captureFrame() {
        const video = this.videoRef.current
        const canvas = this.canvasRef.current
        let ctx = canvas.getContext('2d')

        ctx.drawImage(video, 0, 0)

        canvas.toBlob(blob => {
            let url = URL.createObjectURL(blob)
            this.setState({
                imageURL: url
            })
        })
    }

    render() {
        return (
            <div>
                <video ref={this.videoRef} controls width={640} height={480}></video>
                <canvas style={{ display: 'none' }} ref={this.canvasRef}></canvas>
                <img ref={this.imageRef} src={this.state.imageURL}></img>
            </div>
        )
    }
}