'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const SpreadSheet = use('SpreadSheet')


/** FRONTEND ROUTES */

Route.group(() => {
    Route.get('', 'Frontend/TaskController.index')
}).prefix('tasks')

Route.group(() => {
    Route.post('', 'Frontend/LeadController.create')
}).prefix('leads')

Route.group(() => {
    Route.get('', 'Frontend/VideoController.index')
}).prefix('videos')

Route.group(() => {
    Route.get('', 'Frontend/StaticController.index')
    Route.get('alias/:alias', 'Frontend/StaticController.one').middleware(['staticAlias'])
}).prefix('statics')

Route.group(() => {
    Route.get('', 'Frontend/TextController.index')
    Route.get('type/:type', 'Frontend/TextController.type').middleware(['textType'])
}).prefix('texts')


/** ADMIN ROUTES */

Route.group(() => {
    Route.post('user/login', 'Auth/UserController.login')
    Route.post('user/register', 'Auth/UserController.register')
    Route.get('user/me', 'Auth/UserController.me').middleware(['auth'])
}).prefix('admin')

Route.group(() => {
    Route.get('tasks', 'Admin/TaskController.index')
    Route.get('videos', 'Admin/VideoController.index')
    Route.get('videos/task/:task_id', 'Admin/VideoController.task')
    Route.get('texts', 'Admin/TextController.index')
    Route.get('statics', 'Admin/StaticController.index')
    Route.get('statics/alias/:alias', 'Admin/StaticController.index').middleware(['staticAlias'])
    Route.get('leads', 'Admin/LeadController.index')
    Route.get('leads/export/:format', 'Admin/LeadController.export').middleware(['exportFormat'])

    Route.post('tasks', 'Admin/TaskController.create')
    Route.post('texts', 'Admin/TextController.create')
    Route.post('videos', 'Admin/VideoController.create')

    Route.put('tasks', 'Admin/TaskController.update')
    Route.put('texts', 'Admin/TextController.update')
    Route.put('videos', 'Admin/VideoController.update')
    Route.put('statics', 'Admin/StaticController.update')

    Route.delete('tasks', 'Admin/TaskController.delete')
    Route.delete('texts', 'Admin/TextController.delete')
    Route.delete('videos', 'Admin/VideoController.delete')
}).prefix('admin')