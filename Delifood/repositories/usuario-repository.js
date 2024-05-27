require('../models/usuario-model')
const base = require('../bin/base/repository-base')
const md5 = require('md5')

class UsuarioRepository {

    constructor() {
        this._base = new base('Usuario')
        this._projection = 'nome email _id'
    }

    async IsEmailExist(Email) {
        return await this._base._model.findOne({ email: Email }, this._projection)
    }

    async authenticate(Email, Senha) {
        let _hashSenha = md5(Senha)
        return await this._base._model.findOne({ email: Email, senha: _hashSenha }, this._projection)
    }

    async create(data) {
        let userCreate = await this._base.create(data);
        return await this._base._model.findById(userCreate._id, this._projection)
    }

    async update(id, data) {
        let userUpdate = await this._base.update(id, {
            nome: data.nome,
            email: data.email,
            foto: data.foto,
            telefone: data.telefone
        });
        return await this._base._model.findById(userUpdate._id, this._projection);
    }

    async getAll() {
        return await this._base._model.find({}, this._projection);
    }

    async getById(id) {
        return await this._base._model.findById(id, 'nome email foto _id');
    }

    async remove(id) {
        return await this._base.remove(id);
    }
}

module.exports = UsuarioRepository;