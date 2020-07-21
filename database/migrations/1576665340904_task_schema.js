'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.table('tasks', (table) => {
      table.string('mobile', 200)
      table.string('desktop', 200)
      table.json('subtitles').defaultTo('[]')
    })
  }

  down () {
    this.table('tasks', (table) => {
      table.dropColumn('mobile')
      table.dropColumn('desktop')
      table.dropColumn('subtitles')
    })
  }
}

module.exports = TaskSchema
