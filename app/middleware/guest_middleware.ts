import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

interface Options {
  guards?: (keyof Authenticators)[]
}

export default class GuestMiddleware {
  redirectTo = '/'

  async handle(ctx: HttpContext, next: NextFn, options: Options = {}) {
    for (let guard of options.guards || [ctx.auth.defaultGuard]) {
      if (await ctx.auth.use(guard).check()) {
        return ctx.response.redirect(this.redirectTo, true)
      }
    }
    return next()
  }
}
