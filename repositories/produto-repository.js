const mongoose = require('mongoose')
require('../models/produto-model')
const ProdutoModel = mongoose.model('Produto')


class ProdutoRepository {

    constructor() {}

    async create(data) {
        let produto = new ProdutoModel(data);
        let result = await produto.save();
        return result;
    }

    async update(id, data) {
        await ProdutoModel.findByIdAndUpdate(id, { $set:data })
        let result = await ProdutoModel.findById(id)
        return result;
    }

    async getAll() {
       return await ProdutoModel.find();
    }

    async getById(id) {
        return await ProdutoModel.findById(id);
    }

    async remove(id) {
        return await ProdutoModel.findByIdAndRemove(id);
    }
}

module.exports = ProdutoRepository;