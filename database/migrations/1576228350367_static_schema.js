'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StaticSchema extends Schema {
  up () {
    this.table('statics', (table) => {
      table.string('alias', 30)
    })
  }

  down () {
    this.table('statics', (table) => {
      table.dropColumn('alias')
    })
  }
}

module.exports = StaticSchema
