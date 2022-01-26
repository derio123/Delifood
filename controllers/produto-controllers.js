'use strict'

const repository = require('../repositories/produto-repository')
const _repo = new repository();
const validation = require('../bin/helpers/validation')
const ctrlBase = require('../bin/base/controller-base')

function produtoController() { }

produtoController.prototype.post = async (req, res) => {

    let _validationContract = new validation();

    _validationContract.isRequired(req.body.nome, 'Nome é obrigatorio!');
    _validationContract.isRequired(req.body.descricao, 'Descrição é obrigatorio!');
    _validationContract.isRequired(req.body.preco, 'Preço é obrigatorio!');
    _validationContract.isRequired(req.body.foto, 'Insira sua foto!');

    if (req.body.preco) {
        _validationContract.isTrue(req.body.preco == 0, 'O preço deve ser maior que zero.')
    }
    ctrlBase.post(_repo, _validationContract, res, req);
}

produtoController.prototype.put = async (req, res) => {

    _validationContract.isRequired(req.body.nome, 'Nome é obrigatorio!');
    _validationContract.isRequired(req.body.descricao, 'Descrição é obrigatorio!');
    _validationContract.isRequired(req.body.preco, 'Preço é obrigatorio!');
    _validationContract.isRequired(req.body.foto, 'Insira sua foto!');

    if (req.body.preco) {
        _validationContract.isTrue(req.body.preco == 0, 'O preço deve ser maior que zero.')
    }

    ctrlBase.put(_repo, _validationContract, res, req);
}

produtoController.prototype.get = async (req, res) => {
    ctrlBase.get(_repo, res, req)
}

produtoController.prototype.getbyId = async (req, res) => {
    ctrlBase.getById(_repo, res, req)
}

produtoController.prototype.delete = async (req, res) => {
    ctrlBase.delete(_repo, res, req)
}

module.exports = produtoController;