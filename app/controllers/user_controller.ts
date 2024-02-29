import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import { createUserValidator } from '#validators/user'
import UserService from '#services/user_service'

@inject()
export default class UserController {
  constructor(protected userService: UserService) {}

  async store({ request }: HttpContext, validator = createUserValidator) {
    const data = request.all()
    const payload = await validator.validate(data)
    return this.userService.create(payload)
  }
}
