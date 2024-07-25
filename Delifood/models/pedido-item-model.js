'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema

const pedidoItemModel = new schema({
    produtoId: { type: schema.Types.ObjectId, ref: 'Produto' },
    quantidade: { type: Number, required: true, default: 0 }
}, { versionKey: false });

module.exports = mongoose.model('PedidoItem', pedidoItemModel);