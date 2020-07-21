'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table.string('button_text', 200).notNullable()
      table.integer('priority', 2).notNullable().defaultTo(0)
      table.boolean('active').notNullable().defaultTo(true)
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
