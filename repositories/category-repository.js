const mongoose = require('mongoose')
require('../models/categorias-model')
const CategoriaModel = mongoose.model('Categoria')


class categoryRepository {

    constructor() {}

    async create(data) {
        let categoria = new CategoriaModel(data);
        let result = await categoria.save();
        return result;
    }

    async update(id, data) {
        await CategoriaModel.findByIdAndUpdate(id, { $set:data })
        let result = await CategoriaModel.findById(id)
        return result;
    }

    async getAll() {
       return await CategoriaModel.find();
    }

    async getById(id) {
        return await CategoriaModel.findById(id);
    }

    async remove(id) {
        return await CategoriaModel.findByIdAndRemove(id);
    }
}

module.exports = categoryRepository;