'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class TextType {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, params: {type} }, next) {

    if (type !== 'start' && type !== 'continue' && type !== 'feedback' && type !== 'end') {
      return response.status(400)
          .json({
            success: false,
            message: `Unknown type "${type}".`,
          })
    }

    await next()
  }
}

module.exports = TextType
