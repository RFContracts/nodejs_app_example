'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  async run () {
    const arr = [
      {
        username: 'admin',
        email: 'admin@admin.com',
        password: '$2a$10$tVp7ih14Lbks0MyOL2Vc7ei8aEFnLyrBYAAE8VHXUb0EZYtDhJrya',
      },
    ]

    await Factory
        .model('App/Models/User')
        .createMany(arr.length, arr)
  }
}

module.exports = UserSeeder
