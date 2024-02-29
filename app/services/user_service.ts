import User from '#models/user'
import { inject } from '@adonisjs/core'
import NotificationService from './notification_service.js'

@inject()
export default class UserService {
  constructor(
    protected user: User,
    protected notificator: NotificationService
  ) {}

  async create(value: any): Promise<User> {
    const savedUser = this.user.fill(value).save()
    if (savedUser) {
      this.notificator.send(savedUser.email, 'Usuário criado com sucesso')
    }
    return savedUser
  }
}
