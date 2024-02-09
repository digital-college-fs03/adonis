/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import login_controller from '#controllers/login_controller'
import UserController from '#controllers/user_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/login', login_controller)

router.resource('users', UserController).apiOnly()
