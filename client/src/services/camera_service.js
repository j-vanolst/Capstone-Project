import axios from 'axios'

const API_URL = 'http://localhost:9000/api/camera/'

class CameraService {
    add(name, location, url, startTime, endTime, userID) {
        return axios
            .post(API_URL + 'add', {
                name,
                location,
                url,
                startTime,
                endTime,
                userID
            })
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
            })
            .then((res) => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    edit(name, location, url, startTime, endTime, cameraID, userID) {
        return axios
            .post(API_URL + 'edit', {
                name,
                location,
                url,
                startTime,
                endTime,
                cameraID,
                userID
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