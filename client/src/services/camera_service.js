import axios from 'axios'
import authHeader from './auth_header'

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
                console.log(res)

                return Response.data
            })
    }

    get(userID) {
        return axios
            .post(API_URL + 'get', {
                userID
            })
        // .then((res) => {
        //     return res.data
        // })
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
                console.log(res)

                return Response.data
            })
    }

    remove(cameraID, userID) {
        return axios
            .post(API_URL + 'remove', {
                cameraID,
                userID
            })
            .then(res => {
                console.log(res)

                return Response.data
            })
    }
}

export default new CameraService()