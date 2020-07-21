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
}

module.exports = StaticController
