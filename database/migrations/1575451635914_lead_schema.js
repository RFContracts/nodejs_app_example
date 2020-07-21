'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LeadSchema extends Schema {
  up () {
    this.create('leads', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.string('email', 100).notNullable().unique()
      table.string('phone', 20).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('leads')
  }
}

module.exports = LeadSchema
