/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import LoginController from '#controllers/login_controller'

const UserController = () => import('#controllers/user_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/login', LoginController)

router.get('/public', () => 'esta rota é pública')

router.get('/private', () => 'esta rota é privada').use(middleware.auth({ guards: ['api'] }))

router.resource('users', UserController).apiOnly()
