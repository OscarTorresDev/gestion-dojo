const express = require('express');
const router = express.Router();
const senseiCtrl = require('../controllers/sensei.controller'); 

// Rutas CRUD completas
router.get('/', senseiCtrl.getSenseis); 
router.post('/', senseiCtrl.createSensei);
router.get('/:id', senseiCtrl.getSensei); 
router.put('/:id', senseiCtrl.updateSensei);
router.delete('/:id', senseiCtrl.deleteSensei);

module.exports = router;