import React, { Component, createRef } from 'react'
import { Button } from 'react-bootstrap'
import ReactPlayer from 'react-player'


export default class Canvas extends Component {
    constructor(props) {
        super(props)

        this.canvasRef = createRef()
        this.drawRect = this.drawRect.bind(this)

        this.state = {
            canvas: '',
            ctx: ''
        }
    }

    componentDidMount() {
        const canvas = this.canvasRef.current
        const ctx = canvas.getContext('2d')
        this.setState({
            canvas: canvas,
            ctx: ctx
        })

    }

    drawRect(x1, y1, x2, y2) {
        if (this.state.ctx) {
            this.state.ctx.fillRect(10, 10, 50, 50)
        }
    }

    render() {
        return (
            <div className="canvas">
                <canvas ref={this.canvasRef} width={640} height={480} />
                <Button variant="info" onClick={this.drawRect}>Test</Button>
                <ReactPlayer url="http://localhost:9000/api/video/getFile/5ecb31f5a7cd084780c126ab" />
            </div>
        )
    }
}
