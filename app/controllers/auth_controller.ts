import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import User from '#models/user'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findBy('email', email)
    if (!user) {
      response.abort('Invalid credentials', 401)
      return
    }

    await hash.verify(user.password, password)

    const abilities = ['*']
    const options = {
      expiresIn: '2 hours',
    }
    const token = await User.authTokens.create(user, abilities, options)

    return token.toJSON()
  }
}
