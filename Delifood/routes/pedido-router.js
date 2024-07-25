'use strict'

const express = require('express')
const router = express.Router();
const controller = require('../controllers/pedido-controller')
const auth = require('../middlewares/authenticacion')

let _ctrl = new controller() 

router.get('/', auth, _ctrl.get)
router.get('/:id', auth, _ctrl.getbyId)
router.post('/', auth, _ctrl.post)

module.exports = router