'use strict'

const User = use('App/Models/User')

class UserController {
    async register ({ request, auth, response }) {
        const userData = request.only(['username', 'email', 'password'])

        try {
            const user = await User.create(userData)

            const token = await auth.generate(user)

            return response.json({
                status: 'success',
                data: token
            })
        } catch (error) {
            return response.status(400).json({
                status: 'error',
                message: 'There was a problem creating the user, please try again later.',
                error: error
            })
        }
    }

    async login ({ request, auth, response }) {
        const { username, password } = request.only(['username', 'password'])

        try {
            const token = await auth.attempt(username, password)

            return response.json({
                status: 'success',
                data: token
            })
        } catch (error) {
            response.status(400).json({
                status: 'error',
                message: 'Invalid username/password.',
                error: error
            })
        }
    }

    async me ({ auth, response }) {
        return response.json({
            status: 'success',
            data: auth.user
        })
    }
}

module.exports = UserController