// Node Dependancies
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


// Local Dependancies


const app = express()
app.set('view engine', 'ejs')
app.set('views', 'views')

const dashboardRoutes = require('./routes/dashboard')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(dashboardRoutes)

app.use((req, res, next) => {
    res.render('404', {
        docTitle: 'Page not found',
        path: '404'
    })
})

let port = 9000
console.log(`Starting Server. Listening on port ${port}`)
app.listen(port)