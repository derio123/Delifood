const variables = {
    Api: {
        port: process.env.PORT || 3000
    },
    DB: {
        connection: process.env.connection || 'mongodb+srv://delifoodAdmin:teste@cluster0.ajdme.mongodb.net/delifood?retryWrites=true&w=majority'
    }
}

module.exports = variables;