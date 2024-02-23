import { test } from '@japa/runner'

import User from '#models/user'
import UserService from '#services/user_service'
import { ModelAttributes } from '@adonisjs/lucid/types/model'

test.group('Teste unitário do service', () => {
  test('Create está funcionando corretamente', async ({ assert }) => {
    const payload = {
      fullName: "Jhon Doe",
      email: "2@wilcorrea.dev",
      password: "123mudar"
    }
    class MockUser extends User {
      fill(value: Partial<ModelAttributes<this>>, allowExtraProperties?: boolean | undefined): this {
        assert.equal(value, payload)
        return this
      }
      save (): Promise<this> {
        this.id = 1
        return new Promise((resolve) => resolve(this))
      }
    }

    // Arrange
    const mockUser = new MockUser()
    const userService = new UserService(mockUser)
    // Act
    const created = await userService.create(payload)
    // Assert
    assert.isObject(created)
    assert.equal(created.id, 1)
  })
})