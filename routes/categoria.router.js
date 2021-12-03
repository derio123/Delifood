'use strict'

const express = require('express')
const router = express.Router();
const categoriaController = require('../controllers/categorias-controllers')

let _ctrl = new categoriaController() 

router.get('/', _ctrl.get)
router.get('/:id', _ctrl.getbyId)
router.post('/', _ctrl.post)
router.put('/:id', _ctrl.put)
router.delete('/:id', _ctrl.delete)

module.exports = router