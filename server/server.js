// Node Dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const methodOverride = require('method-override')


// Local Dependencies
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const cameraRoutes = require('./routes/camera')
const videoRoutes = require('./routes/video')

const dbConfig = require('./config/db_conf')
const db = require('./database/index')

const app = express()

let corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors())
app.use(cookieParser())
app.use(methodOverride('_method'))

app.use(bodyParser.json({ parameterLimit: 100000, limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))


// Database initialization
db.mongoose
    .connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to DB')
    })
    .catch((err) => {
        console.error('DB Connection Error', err)
        process.exit()
    })



app.use(authRoutes)
app.use(userRoutes)
app.use(cameraRoutes)
app.use(videoRoutes)

app.use((req, res, next) => {
    res.render('404', {
        docTitle: 'API Method Not Found',
        path: '404'
    })
})

let port = 9000
console.log(`Starting Server. Listening on port ${port}`)
app.listen(port)