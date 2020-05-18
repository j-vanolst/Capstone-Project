import axios from 'axios'
import authHeader from './auth_header'

const API_URL = 'http://localhost:9000/api/video/'

class VideoService {
    add(filename, userID) {
        console.log(filename)
        return axios
            .post(API_URL + 'add', {
                filename,
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
}

export default new VideoService()