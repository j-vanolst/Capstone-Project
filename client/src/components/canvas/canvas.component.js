import React, { Component, createRef } from 'react'
import { Button } from 'react-bootstrap'
import ReactPlayer from 'react-player'

import './canvas.css'

export default class Canvas extends Component {
    constructor(props) {
        super(props)

        // Canvas Config
        this.canvasWidth = this.props.width
        this.canvasHeight = this.props.height
        this.verticalCorrection = this.props.verticalCorrection

        // Polygon points
        if (props.polygon) {
            this.points = JSON.parse(props.polygon)
        }
        else {
            this.points = []
        }

        this.checkBounds = this.checkBounds.bind(this)
        this.getPosition = this.getPosition.bind(this)
        this.drawPoints = this.drawPoints.bind(this)
        this.drawPolygon = this.drawPolygon.bind(this)
        this.clearCanvas = this.clearCanvas.bind(this)
        this.undo = this.undo.bind(this)
        this.getPoints = this.getPoints.bind(this)

        this.canvasRef = createRef()

        this.state = {
            canvas: '',
            ctx: ''
        }
    }

    componentDidMount() {
        let canvas = this.canvasRef.current
        canvas.addEventListener('mousedown', this.getPosition)
        this.drawPoints(this.points)
        this.drawPolygon(this.points)
    }

    checkBounds(x, y) {
        if (x > this.canvasWidth || x < 0 || y > this.canvasHeight || y < 0) {
            console.log('oob')
            return true
        }
        return false
    }

    getPosition(e) {
        // Get window dimensions and mouse point position
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
        // Need to clear the canvas each time so fill opacity doesn't stack
        this.clearCanvas(false)
        this.drawPoints(this.points)
        this.drawPolygon(this.points)
        console.log(point)
    }

    drawPoints(points) {
        const canvas = this.canvasRef.current
        const ctx = canvas.getContext('2d')

        // Set ctx styles for the points
        ctx.strokeStyle = '#ff9d00'
        ctx.lineWidth = 3

        // Draw a small circle around each point
        for (let aPoint of points) {
            ctx.beginPath()
            ctx.arc(aPoint.x, aPoint.y, 5, 0, 2 * Math.PI)
            ctx.stroke()
            ctx.closePath()
        }

    }

    drawPolygon(points) {
        const canvas = this.canvasRef.current
        const ctx = canvas.getContext('2d')

        // Set ctx styles for polygon
        ctx.lineWidth = 2
        ctx.fillStyle = 'rgba(255, 157, 0, 0.5)'

        console.log('Drawing Polygon')

        // Make sure points exist
        if (!points.length) {
            return
        }
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

    clearCanvas(reset = true) {
        if (reset) {
            this.points = []
        }
        const canvas = this.canvasRef.current
        if (canvas.width) {
            canvas.width = canvas.width
        }
    }

    undo() {
        this.points.pop()
        this.clearCanvas(false)
        this.drawPoints(this.points)
        this.drawPolygon(this.points)
    }

    getPoints() {
        return this.points
    }

    render() {
        return (
            <div className="canvas">
                <canvas ref={this.canvasRef} width={this.canvasWidth} height={this.canvasHeight} />
                <div className="canvas-buttons">
                    <Button variant="outline-danger" onClick={this.clearCanvas}>Clear Polygon</Button>
                    <Button variant="outline-warning" onClick={this.undo}>Undo</Button>
                </div>
            </div>
        )
    }
}
//<ReactPlayer url="http://localhost:9000/api/video/getFile/5ecb31f5a7cd084780c126ab" />
