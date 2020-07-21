'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Text', (faker, i, data) => {
    return {
        title: data[i].title,
        subtitle: data[i].subtitle,
        type: data[i].type,
    }
})

Factory.blueprint('App/Models/Task', (faker, i, data) => {
    return {
        button_text: data[i].button_text,
        priority: data[i].priority,
        active: data[i].active,
    }
})

Factory.blueprint('App/Models/Static', (faker, i, data) => {
    return {
        id: data[i].id,
        alias: data[i].alias,
        title: data[i].title,
        content: data[i].content,
    }
})

Factory.blueprint('App/Models/Video', (faker, i, data) => {
    return {
        mobile: data[i].mobile,
        desktop: data[i].desktop,
        active: data[i].active,
    }
})

Factory.blueprint('App/Models/User', (faker, i, data) => {
    return {
        username: data[i].username,
        email: data[i].email,
        password: data[i].password,
    }
})
