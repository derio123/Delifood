require('../models/produto-model')
const base = require('../bin/base/repository-base')

class ProdutoRepository {

    constructor() {
        this._base = new base('Produto')
    }

    async create(data) {
       return this._base.create(data);
    }

    async update(id, data) {
       return await this._base.update(id, data);
    }

    async getAll() {
        return await this._base._model.find().populate('categoriaId', '_id titulo foto');
       //return await this._base.getAll();
    }

    async getById(id) {
        return await this._base.getById(id);
    }
    async getCategoriaById(id) {
        return await this._base._model.find({categoriaId: id});
    }

    async remove(id) {
        return await this._base.remove(id);
    }
}

module.exports = ProdutoRepository;