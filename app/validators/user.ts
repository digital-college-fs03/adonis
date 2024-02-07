import vine from '@vinejs/vine'

/**
 * Validates the user's creation action
 */
export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine
        .string()
        .trim()
        .minLength(2)
        .maxLength(254),
    email: vine
        .string()
        .trim()
        .email()
        .maxLength(254),
    password: vine
        .string()
        .trim()
        .minLength(6)
        .maxLength(140)
  })
)

/**
 * Validates the user's update action
 */
export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine
        .string()
        .trim()
        .minLength(2)
        .maxLength(254),
    password: vine
        .string()
        .trim()
        .minLength(6)
        .maxLength(140)
  })
)
