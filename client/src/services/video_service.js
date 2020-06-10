import axios from 'axios'

import authHeader from './auth_header'

const API_URL = 'http://localhost:9000/api/video/'

class VideoService {
    add(filename, userID, file) {

        const formData = new FormData()
        formData.append('filename', filename)
        formData.append('userID', userID)
        formData.append('file', file)

        const config = {
            headers: authHeader()
        }
        // Add multipart to header
        config.headers['content-type'] = 'multipart/form-data'

        return axios
            .post(API_URL + 'add', formData, config)
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    get(userID) {
        return axios
            .post(API_URL + 'get', {
                userID
            }, {
                headers: authHeader()
            })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    getFile(videoID) {
        return axios
            .get(API_URL + 'getFile/' + videoID, {
                videoID
            }, {
                headers: authHeader()
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    remove(videoID, userID) {
        return axios
            .post(API_URL + 'remove', {
                videoID,
                userID
            }, {
                headers: authHeader()
            })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    update(videoID, polygon, model, userID) {
        return axios
            .post(API_URL + 'update', {
                videoID,
                polygon,
                model,
                userID
            }, {
                headers: authHeader()
            })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export default new VideoService()