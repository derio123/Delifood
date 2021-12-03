'use strict'

const express = require('express')
const router = express.Router();
const produtoController = require('../controllers/produto-controllers')

let _ctrl = new produtoController() 

router.get('/', _ctrl.get)
router.get('/:id', _ctrl.getbyId)
router.post('/', _ctrl.post)
router.put('/:id', _ctrl.put)
router.delete('/:id', _ctrl.delete)

module.exports = router