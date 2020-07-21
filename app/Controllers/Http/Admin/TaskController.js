'use strict'

const Task = use('App/Models/Task')
const Helpers = use('Helpers')

class TaskController {
    /**
     * READ
     */

    async index({response}) {
        try {
            const tasks = await Task.query()
                .orderBy('id', 'asc')
                .fetch()

            return response.status(200).json(tasks)
        } catch (e) {
            return response.status(500).json({
                success: false,
                error: e
            })
        }
    }

    /**
     * CREATE
     */

    async create({request, response}) {

        if (!request._files.fileMobile) {
            return response.status(400).json({
                success: false,
                message: 'File mobile video not received.'
            })
        } else if (!request._files.fileDesktop) {
            return response.status(400).json({
                success: false,
                message: 'File desktop video not received.'
            })
        }

        let path = []
        const types = ['mobile', 'desktop']

        try {
            for (let i = 0; i < types.length; i++) {
                const type = types[i]
                const upload = await this.upload({request, type})

                if (upload.success !== true) {
                    return response.status(500).json({
                        success: false,
                        type: type,
                        message: upload.message
                    })
                }
                type === 'mobile' ? path.mobile = upload.path : path.desktop = upload.path
            }
        } catch (e) {
            return response.status(500).json({
                success: false,
                type: type,
                message: 'Uploading error',
                error: e
            })
        }
        
        try {
            const body = request.only(['button_text', 'priority', 'active', 'subtitles'])

            const data = {
                button_text: body.button_text,
                priority: body.priority,
                active: body.active,
                subtitles: body.subtitles,
                mobile: path['mobile'],
                desktop: path['desktop'],
            }
        
            const task = await Task.create(data)
        
            console.log('task:', task)

            return response.status(200).json({
                success: true,
                message: 'Task was created',
                object: task
            })
        } catch (e) {
            return response.status(500).json({
                success: false,
                message: 'Task was not created',
                error: e
            })
        }
    }


    /**
     *  UPDATE
     */

    async update({request, response}) {

        let path = []

        if (request._files.fileMobile) {
            try {
                const type = 'mobile'
                const upload = await this.upload({request, response, type})

                if (upload.success !== true) {
                    return response.status(500).json({
                        success: false,
                        type: type,
                        message: upload.message
                    })
                }
                path.mobile = upload.path
            } catch (e) {
                return response.status(500).json({
                    success: false,
                    type: type,
                    message: 'Uploading mobile video error',
                    error: e
                })
            }
        }

        if (request._files.fileDesktop) {
            try {
                const type = 'desktop'
                const upload = await this.upload({request, response, type})

                if (upload.success !== true) {
                    return response.status(500).json({
                        success: false,
                        type: type,
                        message: upload.message
                    })
                }
                path.desktop = upload.path
            } catch (e) {
                return response.status(500).json({
                    success: false,
                    type: type,
                    message: 'Uploading desktop video error',
                    error: e
                })
            }
        }

        try {
            const body = request.body

            const data = {
                id: body.id,
                button_text: body.button_text,
                priority: body.priority,
                active: body.active
            }

            if (path['mobile']) {
                data.mobile = path['mobile']
            }

            if (path['desktop']) {
                data.desktop = path['desktop']
            }

            const task = await Task.find(body.id)

            if (!task) {
                return response.status(404)
                    .json({
                        success: false,
                        message: 'Task for updating not found.',
                    })
            }

            task.button_text = body.button_text
            task.priority = body.priority
            task.subtitles = body.subtitles
            task.active = body.active

            if (path['mobile']) {
                task.mobile = path['mobile']
            }

            if (path['desktop']) {
                task.desktop = path['desktop']
            }

            await task.save()

            return response.status(200)
                .json({
                    success: true,
                    message: 'Task was updated successfully.',
                    object: task
                })
        } catch (e) {
            return response.status(500)
                .json({
                    success: false,
                    message: 'Task was not updated.',
                    error: e
                })
        }
    }

    /**
     * DELETE
     */

    async delete({request, response}) {
        const body = request.body

        try {
            const task = await Task.find(body.id)

            if (!task) {
                return response.status(404)
                    .json({
                        success: false,
                        message: 'Task for deleting not found.'
                    })
            }
            await task.delete()

            return response.status(200).json({
                success: true,
                message: 'Task was deleted successfully.',
                object: task
            })
        } catch (e) {
            return response.status(400).json({
                success: false,
                message: 'Task was not deleted',
                error: e
            })
        }
    }


    /**
     * UPLOAD
     */


    async upload({request, type}) {

        const nameType = type && type[0].toUpperCase() + type.slice(1)

        try {
            const file = request.file(`file${nameType}`, {
                types: ['image'],
                size: '20mb',
                // extname: ['mp4']
            })

            const name = `${new Date().toISOString()}_${type}.${file.extname}`
            await file.move(Helpers.publicPath(`/video/${type}/`), {
                name: name,
                overwrite: false
            })


            if (!file.moved()) {
                return {
                    success: false,
                    error: file.error()
                }
            }
            const res = {
                success: true,
                path: `/video/${type}/${name}`,
            }
            return res
        } catch (e) {
            return {
                success: false,
                message: 'Files was not uploaded.',
                error: e
            }
        }
    }
}

module.exports = TaskController
