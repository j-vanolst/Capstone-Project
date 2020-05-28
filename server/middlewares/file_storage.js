const path = require('path')
const mongoose = require('mongoose')
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')

const dbConf = require('../config/db_conf')


const conn = mongoose.createConnection(dbConf.mongooseURI)

const storage = new GridFsStorage({
    url: dbConf.mongooseURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err)
                }
                const filename = buf.toString('hex') + path.extname(file.originalname)
                const fileInfo = {
                    filename: filename,
                    bucketName: 'videos'
                }
                resolve(fileInfo)
            })
        })
    }
})

const upload = multer({ storage })

module.exports = {
    conn: conn,
    storage: storage,
    upload: upload
}
