'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VideoSchema extends Schema {
  up () {
    this.create('videos', (table) => {
      table.increments()
      table.string('mobile', 200)
      table.string('desktop', 200)
      table.boolean('is_break').defaultTo(false)
      table.boolean('active').defaultTo(true)
      table.integer('task_id', 3).nullable().unsigned().references('id').inTable('tasks')
    })
  }

  down () {
    this.drop('videos')
  }
}

module.exports = VideoSchema
