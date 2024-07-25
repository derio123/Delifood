const base = require('../bin/base/repository-base')
require('../models/pedido-model');

class pedidoRepository {

    constructor() {
        this._base = new base('Pedido');
    }

    async create(data) {
        return this._base.create(data);
    }

    async update(id, data) {
        return await this._base.update(id, data);
    }

    async getAll(_usuarioId) {
        return await this._base._model.find({_usuarioId: usuarioId});
    }

    async getById(id) {
        return await this._base.getById(id);
    }

    async remove(id) {
        return await this._base.remove(id);
    }
}

module.exports = pedidoRepository;
