'use strict'

/*
|--------------------------------------------------------------------------
| VideoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class VideoSeeder {
  async run () {
    const arr = [
      { id: 1, mobile: '/video/mobile/1.mp4', desktop: '/video/desktop/1.mp4'},
      { id: 2, mobile: '/video/mobile/2.mp4', desktop: '/video/desktop/2.mp4'},
      { id: 3, mobile: '/video/mobile/3.mp4', desktop: '/video/desktop/3.mp4'},
      { id: 4, mobile: '/video/mobile/4.mp4', desktop: '/video/desktop/4.mp4'},
      { id: 5, mobile: '/video/mobile/5.mp4', desktop: '/video/desktop/5.mp4'},
      { id: 6, mobile: '/video/mobile/6.mp4', desktop: '/video/desktop/6.mp4'},
      { id: 7, mobile: '/video/mobile/7.mp4', desktop: '/video/desktop/7.mp4'},
    ]

    await Factory
        .model('App/Models/Video')
        .createMany(arr.length, arr)
  }
}

module.exports = VideoSeeder
