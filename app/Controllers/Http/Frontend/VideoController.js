'use strict'

const Video = use('App/Models/Video')

class VideoController {

    async index({response}) {
        const videos = await Video.query()
            .where('active', true)
            .fetch()

        return response.json(videos)
    }
}

module.exports = VideoController