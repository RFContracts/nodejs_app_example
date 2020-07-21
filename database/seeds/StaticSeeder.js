'use strict'

/*
|--------------------------------------------------------------------------
| StaticSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class StaticSeeder {
  async run () {
    const arr = [
      { id: 1, alias: 'personal', title: 'Текст обработки персональных данных', content: 'Текст обработки персональных данных. Текст обработки персональных данных. Текст обработки персональных данных. Текст обработки персональных данных. Текст обработки персональных данных. Текст обработки персональных данных. Текст обработки персональных данных. '},
      { id: 2, alias: 'confidential', title: 'Текст политики конфиденциальности', content: 'Текст политики конфиденциальности. Текст политики конфиденциальности. Текст политики конфиденциальности. Текст политики конфиденциальности. Текст политики конфиденциальности. Текст политики конфиденциальности. Текст политики конфиденциальности. Текст политики конфиденциальности. '},
      { id: 3, alias: 'phone', title: 'Телефон', content: '8 499 427 11 01'},
      { id: 4, alias: 'address', title: 'Адрес', content: 'Киевское шоссе, д.4, стр.2, 9 подъезд'},
    ]

    await Factory
        .model('App/Models/Static')
        .createMany(arr.length, arr)

  }
}

module.exports = StaticSeeder
