import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import { createUserValidator } from '#validators/user'
import UserService from '#services/user_service'

@inject()
export default class UserController {
  constructor(protected userService: UserService) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = request.all()
    const payload = await createUserValidator.validate(data)
    return this.userService.create(payload)
  }
}