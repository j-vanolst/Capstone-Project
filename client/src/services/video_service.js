import axios from 'axios'

import authHeader from './auth_header'
import getAPI from '../conf/api_conf'

const API_URL = getAPI() + 'video/'

class VideoService {
    add(filename, userID, file, schedule) {

        const formData = new FormData()
        formData.append('filename', filename)
        formData.append('userID', userID)
        formData.append('file', file)
        formData.append('schedule', schedule)

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

    getFile(fileID) {
        return axios
            .get(API_URL + 'getFile/' + fileID, {
                fileID
            }, {
                headers: authHeader()
            })
            .then(res => {
                return res
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

    edit(videoID, schedule, userID) {
        return axios
            .post(API_URL + 'edit', {
                videoID,
                schedule,
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