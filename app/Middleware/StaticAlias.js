'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class StaticAlias {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, params: {alias} }, next) {
    if (alias !== 'personal' || alias !== 'confidential') {
      return response.status(400)
          .json({
            success: false,
            message: `Unknown alias "${alias}".`,
          })
    }
    await next()
  }
}

module.exports = StaticAlias
