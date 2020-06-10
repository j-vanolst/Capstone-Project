import { read } from 'fs'

const fs = require('fs')

class ImageService {
    getBase64(imagePath) {
        let base64String = ''
        let reader = new FileReader()
        reader.readAsDataURL(imagePath)
        reader.onload = () => {
            this.base64String = reader.result
        }
        reader.onerror = (err) => {
            console.log(err)
        }

        return base64String
    }
}

export default new ImageService()