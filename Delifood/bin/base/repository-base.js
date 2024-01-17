'use strict'

const mongoose = require('mongoose')

class repositoryBase {

    constructor(model) {
        this._model = mongoose.model(model)
     }

    async create(data) {
        let modelo = new this._model(data);
        let result = await modelo.save();
        return result;
    }

    async update(id, data) {
        await this._model.findByIdAndUpdate(id, { $set:data })
        let result = await this._model.findById(id)
        return result;
    }

    async getAll() {
       return await this._model.find();
    }

    async getById(id) {
        return await this._model.findById(id);
    }

    async remove(id) {
        return await this._model.findByIdAndRemove(id);
    }
}

module.exports = repositoryBase;