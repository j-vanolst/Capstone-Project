import getAPI from '../conf/api_conf'

const captureFrame = require('capture-frame')

const API_URL = getAPI() + 'video/getFile/'

export default class FrameCapture {
    constructor(fileID, userID) {
        this.fileID = fileID
        this.userID = userID

        this.video = document.createElement('video')
        this.image = new Image()
        this.blob = ''
    }

    setup() {
        this.video.volume = 0
        this.video.muted = true
        this.video.autoplay = true
        this.video.setAttribute('crossOrigin', 'anonymous')
        this.video.src = API_URL + this.fileID + '/' + this.userID

        return new Promise((resolve, reject) => {
            this.video.oncanplay = () => {
                this.blob = this.captureFrame()
                resolve()
            }
        })

    }

    captureFrame() {
        const buf = captureFrame(this.video)

        // Clear Video src to prevent memory leaks
        this.video.pause()
        this.video = document.createElement('video')

        let blob = window.URL.createObjectURL(new window.Blob([buf]))
        return blob
    }

    getBlob() {
        return this.blob
    }
}