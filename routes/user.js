const express = require('express')
// const router = express.Router()
const router = require('express-promise-router')()

const UserController = require('../controllers/user')

const { validateBody, validateParam, schemas } = require('../helpers/routerHelpers')

const passport = require('passport')
const { protect } = require('../middlewares/auth')



router.route('/').get(protect,UserController.index)

router.route('/signin').post(validateBody(schemas.authSignInSchema), passport.authenticate('local', { session: false }), UserController.signIn)

router.route('/secret').get(
    
    passport.authenticate('jwt', { session: false }),
    UserController.secret
  );
module.exports = router