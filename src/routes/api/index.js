const { Router } = require('express')


const route = Router()

route.use('/users', require('./users'))
route.use('/articles', require('./articles'))
route.use('/user',require('../api/user'))
route.use('/profiles',require('../api/profiles'));
route.use('/tags',require('./tags'));

module.exports = route
