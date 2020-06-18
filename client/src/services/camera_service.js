import axios from 'axios'

import authHeader from './auth_header'

const API_URL = 'http://localhost:9000/api/camera/'

class CameraService {
    add(name, location, url, schedule, userID) {
        return axios
            .post(API_URL + 'add', {
                name,
                location,
                url,
                schedule,
                userID
            }, {
                headers: authHeader()
            })
            .then(res => {
                console.log(res)
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
            .then((res) => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    edit(name, location, url, schedule, cameraID, userID) {
        return axios
            .post(API_URL + 'edit', {
                name,
                location,
                url,
                schedule,
                cameraID,
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

    remove(cameraID, userID) {
        console.log(userID)
        return axios
            .post(API_URL + 'remove', {
                cameraID,
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

    update(cameraID, polygon, model, userID) {
        return axios
            .post(API_URL + 'update', {
                cameraID,
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

export default new CameraService()