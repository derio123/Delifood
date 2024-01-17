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
    _validationContract.isRequired(req.body.categoriaId, 'Informa sua categoria de seu produto!');

    if (req.body.preco) {
        _validationContract.isTrue(req.body.preco == 0, 'O preço deve ser maior que zero.')
    }
    ctrlBase.post(_repo, _validationContract, req, res);
}

produtoController.prototype.put = async (req, res) => {

    _validationContract.isRequired(req.body.nome, 'Nome é obrigatorio!');
    _validationContract.isRequired(req.body.descricao, 'Descrição é obrigatorio!');
    _validationContract.isRequired(req.body.preco, 'Preço é obrigatorio!');
    _validationContract.isRequired(req.body.foto, 'Insira sua foto!');
    _validationContract.isRequired(req.body.categoriaId, 'Informa sua categoria de seu produto!');

    if (req.body.preco) {
        _validationContract.isTrue(req.body.preco == 0, 'O preço deve ser maior que zero.')
    }

    ctrlBase.put(_repo, _validationContract, req, res);
}

produtoController.prototype.get = async (req, res) => {
    ctrlBase.get(_repo, req, res)
}

produtoController.prototype.getbyId = async (req, res) => {
    ctrlBase.getById(_repo, req, res)
}

produtoController.prototype.getCategoriaById = async (req, res) => {
    try {
        let id = req.params.id;
        if (id) {
            let data = await _repo.getCategoriaById(req.params.id);
            res.status(200).send(data);
        } else {
            res.status(400).send({
                message: 'Informe o ID da categoria!!!',
                validation: {}
            })
        }

    } catch (error) {
        console.log('Erro ao fazer o get, motivo: ', error);
        res.status(500).send({ message: 'erro ao processar', error: err })
    }
}
produtoController.prototype.delete = async (req, res) => {
    ctrlBase.delete(_repo, req, res)
}

module.exports = produtoController;