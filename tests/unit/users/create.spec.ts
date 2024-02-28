import { MockUer as User} from '#tests/helper/mock'
import NotificationService from '#services/notification_service'
import UserService from '#services/user_service'
import { test } from '@japa/runner'
import { stubObject } from 'ts-sinon'

test.group('Teste unitário do service', () => {
  test('Create está funcionando corretamente', async ({ assert }) => {
    // arrange
    const user = new User()
    const mockUser = stubObject<User>(user)
    const notificator = new NotificationService()
    const mockNotificator = stubObject<NotificationService>(notificator)
    const userService = new UserService(user, notificator)
    
    mockUser.save.returns(Promise.resolve(user))
    mockNotificator.send.returns()
    // act
    const created = await userService.create({
      "fullName": "Jhon Doe",
      "email": "4@wilcorrea.dev",
      "password": "123mudar"
    })
    // assert
    assert.isNumber(created.id)
    assert.equal(99, created.id)
  })
})