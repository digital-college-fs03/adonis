import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator } from '#validators/user'

export default class UserController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return User.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = request.all()
    const payload = await createUserValidator.validate(data)
    return User.create(payload)
  }

  /**
   * Show individual record
   */
  async show() {}

  /**
   * Handle form submission for the edit action
   */
  async update() {}

  /**
   * Delete record
   */
  async destroy() {}
}
