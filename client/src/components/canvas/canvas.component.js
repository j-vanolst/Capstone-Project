import React, { Component, createRef, createContext } from 'react'
import { Button } from 'react-bootstrap'

import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import FrameCapture from '../../services/frame-capture'

import './canvas.css'


const user = JSON.parse(localStorage.getItem('user'))

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
        this.setBackground = this.setBackground.bind(this)

        this.canvasRef = createRef()
        this.imageRef = createRef()

        this.image = new Image()

        this.state = {
            canvas: '',
            ctx: ''
        }
    }

    componentDidMount() {
        let canvas = this.canvasRef.current
        let ctx = canvas.getContext('2d')

        canvas.addEventListener('mousedown', this.getPosition)

        // Loading notification
        let notification = {
            title: 'Loading...',
            message: 'Loading Camera or Video',
            type: 'warning',
            insert: 'top',
            container: 'top-center',
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 1500,
                onScreen: true
            }
        }
        this.notificationID = store.addNotification(notification)

        // The canvas is a child of a video file
        if (this.props.isVideo) {
            this.setImage()
            store.removeNotification(this.notificationID)
        }
        // The canvas is a child of a camera feed
        else {
            this.drawPoints(this.points)
            this.drawPolygon(this.points)
        }
    }

    setImage() {
        // Sets the image src and waits till its loaded,
        // then draws the background and points on the canvas
        let frameCapture = new FrameCapture(this.props.fileID, user.id)
        frameCapture.setup()
            .then(res => {
                this.setState({
                    blob: frameCapture.getBlob()
                })
                this.image.src = this.state.blob
                setTimeout(() => { }, 1000)
                this.image.onload = () => {
                    this.setBackground()
                    this.drawPoints(this.points)
                    this.drawPolygon(this.points)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    setBackground() {
        let canvas = this.canvasRef.current
        let ctx = canvas.getContext('2d')

        ctx.drawImage(this.image, 0, 0, this.props.width, this.props.height)
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
        this.setBackground()
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
        this.setBackground()
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
