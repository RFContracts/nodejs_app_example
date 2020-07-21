'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class ExportFormat {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, params: {format} }, next) {

    if (format !== 'csv' && format !== 'xls') {
      return response.status(400)
          .json({
            success: false,
            message: `Unknown format "${format}".`
          })
    }

    await next()
  }
}

module.exports = ExportFormat
