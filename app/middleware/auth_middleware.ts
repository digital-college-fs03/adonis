import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

interface Options {
  guards?: (keyof Authenticators)[]
}

export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn, options: Options = {}) {
    await ctx.auth.authenticateUsing(options.guards)
    return next()
  }
}
