'use strict'

/*
|--------------------------------------------------------------------------
| TextSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class TextSeeder {
    async run() {
        const arr = [
            { id: 1, title: 'Я расскажу тебе о профессии бортпроводник', type: 'start' },
            { id: 2, title: 'Хочешь узнать все о профессии бортпроводника?', type: 'start'},
            { id: 3, title: 'Хочешь узнать всю правду о профессии бортпроводника?', type: 'start'},
            { id: 4, title: 'Давай я расскажу тебе все о профессии бортпроводника!', type: 'start'},
            { id: 5, title: 'Что ты хочешь узнать о профессии бортпроводника?', type: 'start'},
            { id: 6, title: 'Почему стоит стать бортпроводником?', type: 'start'},
            { id: 7, title: 'Давай расскажу тебе о том, что можно получить, работая бортпроводником?', type: 'start'},

            { id: 8, subtitle: 'Продолжим? Давай отвечу на твои вопросы!', type: 'continue'},
            { id: 9, subtitle: 'Что еще ты хочешь узнать?', type: 'continue'},
            { id: 10, subtitle: 'А что еще?', type: 'continue'},
            { id: 11, subtitle: 'Что еще тебе рассказать?', type: 'continue'},
            { id: 12, subtitle: 'Давай обсудим дальше!', type: 'continue'},

            { id: 13, title: 'Пора принять участие в настоящем собеседовании', type: 'feedback'},
            { id: 14, title: 'Давай встретимся на собеседовании?', type: 'feedback'},
            { id: 15, title: 'Хочешь работать вместе со мной?', type: 'feedback'},
            { id: 16, title: 'Давай работать вместе!', type: 'feedback'},
            { id: 17, title: 'Записать тебя на собеседование?', type: 'feedback'},
            { id: 18, title: 'Давай запишу тебя на собеседование', type: 'feedback'},

            { id: 19, title: 'Отлично! Встретимся на собеседовании', type: 'end', subtitle: 'Увидимся на собеседовании'},
            { id: 20, title: 'Супер! Ждем тебя на собеседовании!', type: 'end', subtitle: 'Увидимся на собеседовании'},
            { id: 21, title: 'Супер! Ваша заявка отправлена', type: 'end', subtitle: 'Увидимся на собеседовании'},

        ]

        await Factory
            .model('App/Models/Text')
            .createMany(arr.length, arr)

    }
}

module.exports = TextSeeder
