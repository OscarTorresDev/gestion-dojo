const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin.controller'); 

// Rutas CRUD completas
router.get('/', adminCtrl.getAdmins); 
router.post('/', adminCtrl.createAdmin);
router.get('/:id', adminCtrl.getAdmin); 
router.put('/:id', adminCtrl.updateAdmin);
router.delete('/:id', adminCtrl.deleteAdmin);

module.exports = router;