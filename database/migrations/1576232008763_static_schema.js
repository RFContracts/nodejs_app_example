'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StaticSchema extends Schema {
  up () {
    this.table('statics', (table) => {
      table.string('title', 100)
    })
  }

  down () {
    this.table('statics', (table) => {
      table.dropColumn('title')
    })
  }
}

module.exports = StaticSchema
