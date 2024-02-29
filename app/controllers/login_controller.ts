import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default async function (http: HttpContext) {
  const { request, response } = http
  const { username, password } = request.only(['username', 'password'])

  if (!username) {
    return response.forbidden({ username: 'required' })
  }
  const user = await User.findByOrFail('email', username)

  const verified = await hash.verify(user.password, password)
  if (!verified) {
    return response.forbidden({ username })
  }

  const abilities = ['*']
  const options = {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  }
  return await User.accessTokens.create(user, abilities, options)
}
