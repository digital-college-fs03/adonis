import vine from '@vinejs/vine'
import { exists } from '#validators/helpers/db'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(2).maxLength(254),
    email: vine
      .string()
      .trim()
      .email()
      .maxLength(254)
      .exists(exists('users', 'email', { caseInsensitive: true })),
    password: vine.string().trim().minLength(6).maxLength(140),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(2).maxLength(254),
    password: vine.string().trim().minLength(6).maxLength(140),
  })
)
