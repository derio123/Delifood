'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const predidoModel = new schema({
    usuarioId: { type: schema.Types.ObjectId, ref: 'Usuario' },
    valorTotal: { type: Number, required: true, default: 0 },
    itens: [{ type: String, required: true }],
    dataPedido: { type: Date, Default: Date.now }
}, { versionKey: false });

predidoModel.pre('save', next => {
    let agora = new Date();
    if (!this.dataPedido)
        this.dataPedido = agora;
    next();
});

module.exports = mongoose.model('Pedido', predidoModel);