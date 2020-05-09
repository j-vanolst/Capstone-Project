const mongo = require('mongodb')

let mongoClient = mongo.MongoClient
let dbAddress = 'mongodb://localhost:27017/mydb'

mongoClient.connect(dbAddress, function (err, db) {
    if (err) throw err
    console.log('Database Created')
    db.close()
})
