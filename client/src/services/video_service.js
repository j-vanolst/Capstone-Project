import axios from 'axios'

const API_URL = 'http://localhost:9000/api/video/'

class VideoService {
    add(filename, userID, file) {

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
            })
            .then(res => {
                return res.data
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