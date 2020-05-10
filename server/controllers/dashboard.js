exports.default = (req, res, next) => {
    res.send('Dashboard')
}

exports.callAPI = (req, res, next) => {
    res.send('API Called Successfully')
}