'use strict'

require('../models/categorias-model')
const repository = require('../repositories/category-repository')

function categoriaController() {}

categoriaController.prototype.post = async (req, res) => {
    let result = await new repository().create(req.body)
    res.status(201).send(result);
}

categoriaController.prototype.put = async (req, res) => {
    let categoriaSearch = await new repository().update(req.params.id, req.body)
    res.status(202).send(categoriaSearch)
}

categoriaController.prototype.get = async (req, res) => {
    let list = await new repository().getAll();
    res.status(200).send(list)
}

categoriaController.prototype.getbyId = async (req, res) => {
    let categoria = await new repository().getById(req.params.id)
    res.status(200).send(categoria)
}

categoriaController.prototype.delete = async (req, res) => {
    let categoriaDel = await new repository().remove(req.params.id);
    res.status(204).send(categoriaDel)
}

module.exports = categoriaController;