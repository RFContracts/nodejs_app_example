'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StaticSchema extends Schema {
  up () {
    this.create('statics', (table) => {
      table.increments()
      table.text('content').notNullable()
    })

  }

  down () {
    this.drop('statics')
  }
}

module.exports = StaticSchema
