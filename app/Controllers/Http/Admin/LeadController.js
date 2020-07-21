'use strict'

const Lead = use('App/Models/Lead')
const SpreadSheet = use('SpreadSheet')

class LeadController {

    async index({response}) {
        try {
            const leads = await Lead.all()
            return response.json(leads)
        } catch (e) {
            return response.status(500).json({
                success: false,
                error: e
            })
        }

    }

    /**
     * Export leads table
     *
     * @param response
     * @param params
     * @returns {Promise<void>}
     */
    async export({ response, params }) {
        const ss = new SpreadSheet(response, params.format)

        const leads = await Lead.all()
        const data = []

        data.push([
            '#',
            'ID',
            'Имя',
            'Email',
            'Телефон',
            'Создан',
        ])

        let i = 1

        leads.toJSON().forEach(lead => {
            data.push([
                i,
                lead.id,
                lead.name,
                lead.email,
                lead.phone,
                lead.created_at,
            ])
            ++i
        })

        ss.addSheet('Leads', data)
        ss.download('leads-export')
    }
}

module.exports = LeadController
