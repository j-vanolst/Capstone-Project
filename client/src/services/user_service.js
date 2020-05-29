import axios from 'axios'

import authHeader from './auth_header'

const API_URL = 'http://localhost:9000/api/user/'

class UserService {
    edit(fName, lName, email, userID) {
        return axios
            .post(API_URL + 'edit', {
                fName,
                lName,
                email,
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
    changePassword(currentPassword, newPassword, newPasswordConfirm, userID) {
        return axios
            .post(API_URL + 'changePassword', {
                currentPassword,
                newPassword,
                newPasswordConfirm,
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

export default new UserService()