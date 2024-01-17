'use strict'

const repository = require('../repositories/usuario-repository')
const validation = require('../bin/helpers/validation')
const ctrlBase = require('../bin/base/controller-base')
const _repo = new repository();
const md5 = require('md5');
const jwt = require('jsonwebtoken')
const variables = require('../bin/settings/variables')

function usuarioController() { }

usuarioController.prototype.post = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.nome, 'Informe seu nome!');
    _validationContract.isRequired(req.body.email, 'Informe seu email!');
    _validationContract.isEmail(req.body.email, 'Email Inválido!');
    _validationContract.isRequired(req.body.senha, 'Senha Inválida!');
    _validationContract.isRequired(req.body.senhaConfirmacao, 'Informe um email válido!');
    _validationContract.isTrue(req.body.senha != req.body.senhaConfirmacao,
        'Senha e Confirmação não são iguais, corrigas!');

    if (req.body.email) {
        let userIsExitEmail = await _repo.IsEmailExist(req.body.email);
        if (userIsExitEmail) {
            _validationContract.isTrue((userIsExitEmail.nome != undefined),
                `Este email ${req.body.email} já existe em nossa base!`)
        }
    }

    if(req.body.senha) {
        req.body.senha = md5(req.body.senha);
    }
    

    ctrlBase.post(_repo, _validationContract, req, res);
}

usuarioController.prototype.put = async (req, res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.nome, 'Informe seu nome!');
    _validationContract.isRequired(req.body.email, 'Informe seu email!');
    _validationContract.isEmail(req.body.email, 'Email Inválido!');
    _validationContract.isRequired(req.params.id, 'Informe o ID quer será atualizado !');

    let userIsExitEmail = await _repo.IsEmailExist(req.body.email);
    if (userIsExitEmail) {
        _validationContract.isTrue(
            (userIsExitEmail.nome != undefined)
            && (userIsExitEmail._id != req.params.id),
            `Este email ${req.body.email} já existe em nossa base!`)
    }

    ctrlBase.put(_repo, _validationContract, req, res);
}

usuarioController.prototype.get = async (req, res) => {
    ctrlBase.get(_repo, req, res);
}

usuarioController.prototype.getbyId = async (req, res) => {
    ctrlBase.getById(_repo, req, res);
}

usuarioController.prototype.delete = async (req, res) => {
    ctrlBase.remove(_repo, req, res);
}

usuarioController.prototype.autenticar = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.email, 'Informe seu email!');
    _validationContract.isEmail(req.body.email, 'Email invalido, digite corretamente!');
    _validationContract.isRequired(req.body.senha, 'Informe sua senha!');

    if (!_validationContract.isValid()) {
        res.status(400).send({
            message: 'Não foi possível efetuar Login',
            validation: _validationContract.errors()
        })
        return;
    }

    let usuarioEncontrado = await _repo.authenticate(req.body.email, req.body.senha);
    if (usuarioEncontrado) {
        res.status(200).send({
            usuario: usuarioEncontrado,
            token: jwt.sign({ user: usuarioEncontrado }, variables.Security.securityKey)
        })
    } else {
        res.status(404).send({ message: 'Usuario e senha incorretos!' })
    }
}

module.exports = usuarioController;