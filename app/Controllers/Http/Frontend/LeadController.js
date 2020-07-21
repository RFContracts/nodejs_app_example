'use strict'

const Lead = use('App/Models/Lead')
const Mail = use('Mail')

const appParams = require('../../../../config/params')

class LeadController {

    /**
     * Create new lead
     *
     * @param request
     * @param response
     * @returns {Promise<*|Promise<any>>}
     */
    async create({request, response}) {
        let lead
        try {
            const body = request.only(['name', 'email', 'phone'])
            lead = await Lead.create(body)
            await this.sendLeadMail(lead)
            return response.status(200)
                .send({
                    success: true,
                    message: 'Successfully created a new lead.',
                    object: lead
                })
        } catch (e) {
            return response.status(400)
                .json({
                    success: false,
                    message: 'Lead was not created.',
                    error: e
                })
        }
    }


    /**
     * Send notification email
     *
     * @param lead
     * @returns {Promise<void>}
     */
    async sendLeadMail(lead) {
        try {
            await Mail.send(['emails.lead', 'emails.lead-text'], lead.toJSON(), message => {
                message
                    .from(appParams.from_email)
                    .to(appParams.to_email)
                    .subject(appParams.subject)
            })
        } catch (e) {
            console.log('error', e)
        }
    }
}

module.exports = LeadController
