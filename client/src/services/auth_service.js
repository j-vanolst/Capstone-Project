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

                return Response.data
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
    }

    reset(email) {
        return axios
            .post(API_URL + 'reset', {
                email
            })
            .then((res) => {
                return Response.data
            })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'))
    }

}

export default new AuthService()