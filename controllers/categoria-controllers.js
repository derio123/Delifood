'use strict'

const repository = require('../repositories/categoria-repository')
const _repo = new repository();
const validation = require('../bin/helpers/validation')
const ctrlBase = require('../bin/base/controller-base')

function categoriaController() {}

categoriaController.prototype.post = async (req, res) => {
    
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.titulo, 'Titulo é obrigatorio!');
    _validationContract.isRequired(req.body.foto, 'Insira sua foto!');

   ctrlBase.post(_repo, _validationContract, res, req);
}

categoriaController.prototype.put = async (req, res) => {
    
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.titulo, 'Titulo é obrigatorio!');
    _validationContract.isRequired(req.body.foto, 'Insira sua foto!');
    _validationContract.isRequired(req.params.id, 'Id é obrigatório para atualização!');

   ctrlBase.put(_repo, _validationContract, res, req);
}

categoriaController.prototype.get = async (req, res) => {
   ctrlBase.get(_repo, res, req);
}

categoriaController.prototype.getbyId = async (req, res) => {
   ctrlBase.getById(_repo, res, req);
}

categoriaController.prototype.delete = async (req, res) => {
   ctrlBase.remove(_repo, res, req);
}

module.exports = categoriaController;