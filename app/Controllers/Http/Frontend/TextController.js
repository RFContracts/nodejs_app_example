'use strict'

const Text = use('App/Models/Text')

class TextController {

    async index({response}) {
        try {
            const texts = await Text.query()
                .where('active', true)
                .fetch()

            return response.status(200)
                .json(texts)
        } catch (e) {
            return response.status(200)
                .json({
                    success: false,
                    error: e
                })
        }

    }

    async type({response, params: {type}}) {

        try {
            let texts = await Text.query()
                .where('active', true)
                .where('type', type)
                .fetch()

            if (texts.length === 0) {
                return response.status(404).json({
                    success: false,
                    message: 'Texts not found.',
                    type
                })
            }

            for (let i = 0; i < texts.length; i++) {
                if (type === 'start') {
                    texts.toJSON()[i].subtitle = ''
                }
            }

            return response.status(200).json(texts.toJSON())
        } catch (e) {
            return response.status(500).json({
                success: false,
                error: e
            })
        }

    }
}

module.exports = TextController
