'use strict'

const express = require('express')
const router = express.Router();
const controller = require('../controllers/categoria-controllers')
const auth = require('../middlewares/authenticacion')

let _ctrl = new controller() 

router.get('/', auth, _ctrl.get)
router.get('/:id', auth, _ctrl.getbyId)
router.post('/', auth, _ctrl.post)
router.put('/:id', auth, _ctrl.put)
router.delete('/:id', auth, _ctrl.delete)

module.exports = router