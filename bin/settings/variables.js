const variables = {
    Api: {
        port: process.env.PORT || 3000
    },
    DB: {
        connection: process.env.connection || 'mongodb+srv://delifoodAdmin:projectTI2019@cluster0.ajdme.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    },
    Security: {
        securityKey: 'd41d8cd98f00b204e9800998ecf8427e'
    }
}

module.exports = variables;