'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VideoSchema extends Schema {
  up () {
    this.table('videos', (table) => {
      table.dropColumn('is_break')
      table.dropColumn('task_id')
    })
  }

  down () {
    this.table('videos', (table) => {
      // reverse alternations
    })
  }
}

module.exports = VideoSchema
