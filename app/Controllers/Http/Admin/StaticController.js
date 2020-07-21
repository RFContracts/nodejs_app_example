'use strict'

const Static = use('App/Models/Static')

class StaticController {
    async index({response}) {
        const staticText = await Static.all()

        return response.json(staticText)
    }

    async one({params, response}) {
        const alias = params.alias
        const staticText = await Static.query()
            .where('alias', alias)
            .fetch()

        return response.json(staticText)
    }

    async update({request, response}) {
        const {id, title, content} = request.only(['id', 'title', 'content'])
        const staticText = await Static.find(id)

        if (!staticText) {
            response.status(404).json({
                success: false,
                message: 'Static for updating is not found.'
            })
        }

        staticText.title = title
        staticText.content = content
        
        await staticText.save()

        return response.json({
            success: true,
            message: 'Static was updated.',
            object: staticText
        })
    }
}

module.exports = StaticController
