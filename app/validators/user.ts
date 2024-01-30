import vine from '@vinejs/vine'

/**
 * Validates the user's creation action
 */
export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    fullName: vine.string().trim().maxLength(255),
    password: vine.string().trim().escape(),
  })
)

/**
 * Validates the user's update action
 */
export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().maxLength(255),
    password: vine.string().trim().escape(),
  })
)
