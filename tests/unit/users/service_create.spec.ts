import User from '#models/user'
import NotificationService from '#services/notification_service'
import UserService from '#services/user_service'
import { test } from '@japa/runner'
import { stubObject } from 'ts-sinon'

test.group('Teste unitário do service', () => {
  test('Create está funcionando corretamente', async ({ assert }) => {
    // arrange
    const user = stubObject<User>(new User())
    const notificator = stubObject<NotificationService>(new NotificationService())
    const userService = new UserService(user, notificator)

    const value = {
      fullName: 'Jhon Doe',
      email: 'test@wilcorrea.dev',
      password: '123mudar',
    }
    user.fill.withArgs(value).returnsThis()
    user.save.returns(Promise.resolve(new User().fill({ id: 99, ...value })))
    notificator.send.returns()

    // act
    const created = await userService.create(value)

    // assert
    assert.isNumber(created.id)
    assert.equal(99, created.id)
  })
})
