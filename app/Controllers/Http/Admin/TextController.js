'use strict'

const Text = use('App/Models/Text')

class TextController {

    async index({response}) {
        let texts
        try {
            texts = await Text.query().orderBy('id', 'asc').fetch()
        } catch (e) {
            return response.status(400)
                .json({
                    success: false,
                    message: 'Error',
                    error: e
                })
        }
        return response.status(200).json(texts)
    }

    async create({request, response}) {

        const body = request.body
        try {
            const text = await Text.create(body)
            return response.status(200).json({
                success: true,
                message: 'Object "Text" was created.',
                object: text
            })
        } catch (e) {
            return response.status(400).json({
                success: false,
                message: 'Error. Object "Text" was not created.',
                error: e
            })
        }
    }

    async update({request, response}) {
        const body = request.body

        try {
            const text = await Text.find(body.id)
            if (!text) {
                return response.status(404)
                    .json({
                        success: false,
                        message: 'Object "Text" for updating not found.',
                    })
            }

            text.title = (body.type === 'continue') ? '' : body.title
            text.subtitle = (body.type === 'start' || body.type === 'feedback') ? '' : body.subtitle
            text.type = body.type
            text.active = body.active
            await text.save()

            return response.status(200)
                .json({
                    success: true,
                    message: 'Object "Text" was updated successfully.',
                    object: text
                })
        } catch (e) {
            return response.status(500)
                .json({
                success: false,
                message: 'Object "Text" was not updated.',
                error: e
            })
        }
    }

    async delete({request, response}) {
        const body = request.body

        try {
            const text = await Text.find(body.id)

            if (!text) {
                return response.status(400)
                    .json({
                        success: false,
                        message: 'Object "Text" for deleting not found.'
                    })
            }
            await text.delete()

            return response.status(200).json({
                success: true,
                message: 'Object "Text" was deleted successfully.',
                object: text
            })
        } catch (e) {
            return response.status(400).json({
                success: false,
                message: 'Object "Text" was not deleted',
                error: e
            })
        }
    }
}

module.exports = TextController
