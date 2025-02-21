const express = require('express')
// const router = express.Router()
const router = require('express-promise-router')()

const UserController = require('../controllers/user')


router.route('/').get(UserController.index)


module.exports = router