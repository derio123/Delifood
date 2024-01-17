const jwt = require('jsonwebtoken');
const variables = require('../bin/settings/variables');

module.exports = async (req, res, next) => {
    let token = req.body.token || req.query.query || req.headers['x-access-token'];
    if(token) {
        try {
            let decored = await jwt.verify(token, variables.Security.securityKey);
            console.log(decored);
            req.userAuthy = decored;
            next();
        } catch (error) {
            res.status(401).send({message: 'Token Invalido'})
            return;
        }
    } else {
        res.status(401).send({message: 'Voce precisa informa um token para acesso'})
        return;
    }
}