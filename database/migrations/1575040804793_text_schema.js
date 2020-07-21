'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TextSchema extends Schema {
  up () {
    this.create('texts', (table) => {
      table.increments()
      table.string('title', 200).nullable()
      table.string('subtitle', 200).nullable()
      table.string('type', 30).notNullable()
      table.boolean('active').notNullable().defaultTo(true)
    })
  }

  down () {
    this.drop('texts')
  }
}

module.exports = TextSchema
