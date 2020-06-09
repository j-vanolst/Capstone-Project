import axios from 'axios'

const API_URL = 'http://localhost:9000/api/auth/'

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + 'login', {
                email,
                password
            })
            .then(res => {
                if (res.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(res.data))
                }

                return res.data
            })
    }

    logout() {
        localStorage.removeItem('user')
    }

    register(fName, lName, email, password) {
        return axios
            .post(API_URL + 'register', {
                fName,
                lName,
                email,
                password
            })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    reset(email) {
        return axios
            .post(API_URL + 'reset', {
                email
            })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    verifyToken(token) {
        return axios
            .post(API_URL + 'verifyToken', {
                token
            })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    async confirmJWT(token) {
        return axios
            .post(API_URL + 'confirmJWT', {
                token
            })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'))
    }

}

export default new AuthService()