import React, { Component, createRef } from 'react'
import { Button } from 'react-bootstrap'
import ReactPlayer from 'react-player'

import './canvas.css'

export default class Canvas extends Component {
    constructor(props) {
        super(props)

        // Canvas Config
        this.canvasWidth = 400
        this.canvasHeight = 400
        this.verticalCorrection = 72

        // Polygon points
        this.points = []

        this.checkBounds = this.checkBounds.bind(this)
        this.getPosition = this.getPosition.bind(this)
        this.drawPoint = this.drawPoint.bind(this)
        this.drawPolygon = this.drawPolygon.bind(this)

        this.canvasRef = createRef()

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
        document.addEventListener('mousedown', this.getPosition)
    }

    checkBounds(x, y) {
        if (x > this.width || x < 0 || y > this.height || y < 0) {
            return true
        }
        return false
    }

    getPosition(e) {
        console.log(`Window Dimensions: Width: ${window.innerWidth} Height: ${window.innerHeight}`)
        console.log(`Point Position: Width: ${e.clientX} Height: ${e.clientY}`)

        // Get X & Y coordinates and recalculate with canvas positioning
        let x = e.clientX - ((window.innerWidth / 2) - (this.canvasWidth / 2))
        let y = e.clientY - this.verticalCorrection

        // Check if the currently clicked point is within the canvas or not
        if (this.checkBounds(x, y)) {
            return
        }

        let point = {
            x: x,
            y: y
        }

        this.points.push(point)
        this.drawPoint(point)
        this.drawPolygon(this.points)
        console.log(point)
    }

    drawPoint(point) {
        const canvas = this.canvasRef.current
        const ctx = canvas.getContext('2d')

        // Set ctx styles for the points
        ctx.strokeStyle = '#ff9d00'
        ctx.lineWidth = 3

        // Draw a small circle around the point
        ctx.beginPath()
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.closePath()
    }

    drawPolygon(points) {
        const canvas = this.canvasRef.current
        const ctx = canvas.getContext('2d')

        // Set ctx styles for polygon
        ctx.lineWidth = 2
        ctx.fillStyle = 'rgba(255, 157, 0, 0.5)'

        console.log('Drawing Polygon')

        // Move to the first point to start drawing
        let firstPoint = this.points[0]
        ctx.beginPath()
        ctx.moveTo(firstPoint.x, firstPoint.y)

        // Loop through each point and draw a line to it
        for (let i = 1; i < this.points.length; i++) {
            let currentPoint = points[i]
            ctx.lineTo(currentPoint.x, currentPoint.y)
        }

        // Close off the polygon, reconnect it to the first point
        ctx.lineTo(firstPoint.x, firstPoint.y)
        ctx.stroke()
        ctx.closePath()
        ctx.fill()
    }

    render() {
        return (
            <div className="canvas">
                <canvas ref={this.canvasRef} width={this.canvasWidth} height={this.canvasHeight} />
                <Button variant="info" onClick={this.drawPolygon}>Draw Polygon</Button>
            </div>
        )
    }
}
//<ReactPlayer url="http://localhost:9000/api/video/getFile/5ecb31f5a7cd084780c126ab" />
