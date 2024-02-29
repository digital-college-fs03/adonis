import { test } from '@japa/runner'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

test.group('Criação de usuário', async () => {
  // arrange
  const email = 'test1@digitalcollege.com.br'
  const password = 'aq1sw2de3'

  test('a senha é salva encriptada', async ({ assert }) => {
    // act
    const user = await User.create({ email, password })

    // assert
    assert.isTrue(hash.isValidHash(user.password))
    assert.isTrue(await hash.verify(user.password, password))
  })

  test('email duplicado', async ({ assert }) => {
    try {
      // act
      await User.create({ email, password })
    } catch (error) {
      // assert
      assert.strictEqual(error.code, 'ER_DUP_ENTRY')
      assert.equal(
        error.sqlMessage,
        `Duplicate entry '${email}' for key 'users.users_email_unique'`
      )
      return
    }
    assert.fail('o email informado deveria gerar erro de duplicidade')
  })
})
