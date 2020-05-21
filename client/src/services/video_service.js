import axios from 'axios'
import authHeader from './auth_header'

const API_URL = 'http://localhost:9000/api/video/'

class VideoService {
    add(filename, file, userID) {
        console.log(filename)
        return axios
            .post(API_URL + 'add', {
                filename,
                file,
                userID
            })
            .then(res => {
                console.log(res)

                return Response.data
            })
    }

    get(userID) {
        return axios
            .post(API_URL + 'get', {
                userID
            })
    }

    remove(videoID, userID) {
        return axios
            .post(API_URL + 'remove', {
                videoID,
                userID
            })
            .then(res => {
                console.log(res)

                return Response.data
            })
    }

    test(filename, userID, file) {
        const formData = new FormData()
        formData.append('filename', filename)
        formData.append('userID', userID)
        formData.append('file', file)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        return axios
            .post(API_URL + 'test', formData, config)
            .then(res => {
                console.log(res)

                return Response.data
            })
    }
}

export default new VideoService()