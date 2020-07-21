'use strict'

const Video = use('App/Models/Video')
const Helpers = use('Helpers')

class VideoController {
    /**
     * READ
     */

    async index({response}) {
        let videos

        try {
            videos = await Video.query()
                .orderBy('id', 'asc')
                .fetch()

            return response.status(200).json(videos)
        } catch (e) {
            return response
                .status(400)
                .json({
                    success: false,
                    message: 'Error',
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
                const upload = await this.upload({request, response, type})

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
            const body = request.only('active')

            const data = {
                mobile: path['mobile'],
                desktop: path['desktop'],
                active: body.active
            }
            
            const video = await Video.create(data)

            return response.status(200).json({
                success: true,
                message: 'Video was created.',
                object: video
            })
        } catch (e) {
            return response.status(500).json({
                success: false,
                message: 'Creating Video error',
                error: e
            })
        }
    }


    /**
     * UPDATE
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
            const body = request.only(['id', 'active'])

            const data = {
                id: body.id,
                active: body.active
            }

            if (path['mobile']) {
                data.mobile = path['mobile']
            }

            if (path['desktop']) {
                data.desktop = path['desktop']
            }

            const video = await Video.find(data.id)

            if (!video) {
                return response.status(404)
                    .json({
                        success: false,
                        message: 'Video not found'
                    })
            }

            video.active = body.active

            if (path['mobile']) {
                video.mobile = path['mobile']
            }

            if (path['desktop']) {
                video.desktop = path['desktop']
            }

            await video.save()

            return response.status(200).json({
                success: true,
                message: 'Video was updated.',
                object: video
            })
        } catch (e) {
            return response.status(500).json({
                success: false,
                message: 'Updating Video error.',
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
            const video = await Video.find(body.id)

            if (!video) {
                return response.status(404)
                    .json({
                        success: false,
                        message: 'Video for deleting not found.'
                    })
            }
            await video.delete()

            return response.status(200).json({
                success: true,
                message: 'Video was deleted successfully.',
                object: video
            })
        } catch (e) {
            return response.status(400).json({
                success: false,
                message: 'Video was not deleted',
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
            await file.move(Helpers.publicPath(`/break_video/${type}/`), {
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
                path: `/break_video/${type}/${name}`,
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

module.exports = VideoController