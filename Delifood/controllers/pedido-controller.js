'use strict'

const repository = require('../repositories/pedido-repository')
const _repo = new repository();
const validation = require('../bin/helpers/validation')
const ctrlBase = require('../bin/base/controller-base')

function pedidoController() { }

pedidoController.prototype.post = async (req, res) => {

    let _validationContract = new validation();

    _validationContract.isRequired(req.body.valorTotal, 'Valor total é obrigatorio!');
    _validationContract.isRequired(req.body.itens, 'Informe os Itens do seu pedido!');

    req.body.usuarioId = req.userAuthy.user._id;

    ctrlBase.post(_repo, _validationContract, req, res);
}

pedidoController.prototype.get = async (req, res) => {
    let result = await _repo.getAll(req.userAuthy._id);
    result.status(200).send(result);
}

pedidoController.prototype.getbyId = async (req, res) => {
    ctrlBase.getById(_repo, req, res);
}

module.exports = pedidoController;