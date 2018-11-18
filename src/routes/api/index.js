const { Router } = require('express')


const route = Router()

route.use('/users', require('./users'))
route.use('/articles', require('./articles'))


module.exports = route
