import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export default class Canvas extends React.Component {
    constructor(props) {
        super(props)

        this.canvasRef = React.createRef()
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
            </div>
        )
    }
}
