'use strict'

const Task = use('App/Models/Task')
const Video = use('App/Models/Video')
const Subtitle = use('App/Models/Subtitle')

class TaskController {

    /**
     * READ
     */

    async index({response}) {
        try {
            const tasks = await Task.query()
                .select(['id', 'button_text', 'priority'])
                .where('active', true)
                .with('video', builder => {
                    return builder
                        .select(['videos.id', 'videos.mobile', 'videos.desktop', 'videos.task_id'])
                })
                .with('subtitles')
                .orderBy('tasks.id', 'asc')
                .fetch()

            if (tasks.length === 0) {
                return response.status(404)
                    .json({success: false, message: 'Tasks array is empty.'})
            }
            return response.status(200).json(tasks)
        } catch (e) {
            console.log(e)
            return e.message
        }
    }
}

module.exports = TaskController
