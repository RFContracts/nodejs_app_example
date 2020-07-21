'use strict'

/*
|--------------------------------------------------------------------------
| TaskSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class TaskSeeder {
  async run () {
    const arr = [
      { id: 1, button_text: 'Как я могу зарабатывать от 80 000 рублей?', priority: 0, active: true },
      { id: 2, button_text: 'Расскажите мне про особенности работы бортпроводником.', priority: 0, active: true },
      { id: 3, button_text: 'Какие страны я могу посетить?', priority: 0, active: true },
      { id: 4, button_text: 'В каких городах я смогу побывать?', priority: 0, active: true },
      { id: 5, button_text: 'Как много мне надо будет летать?', priority: 0, active: true },
      { id: 6, button_text: 'Как долго длится один полет?', priority: 0, active: true },
      { id: 7, button_text: 'Что мне нужно будет делать?', priority: 0, active: true },
      { id: 8, button_text: 'С кем мне нужно будет работать?', priority: 0, active: true },
      { id: 9, button_text: 'Сколько я буду зарабатывать?', priority: 0, active: true },
      { id: 10, button_text: 'Сколько я буду отдыхать?', priority: 0, active: true },
    ]

    await Factory
        .model('App/Models/Task')
        .createMany(arr.length, arr)
  }
}

module.exports = TaskSeeder
