const express = require('express');
const router = express.Router();
const studentCtrl = require('../controllers/student.controller'); 

// 1. Ruta GET (Lectura de todos) - ESTA YA ESTÁ FUNCIONANDO
router.get('/', studentCtrl.getStudents); 

// 2. Ruta POST (Creación de uno nuevo) - ESTA ES LA QUE DA 404
router.post('/', studentCtrl.createStudent); // <-- ¡Asegúrate de tener esta línea!

// 3. Rutas para un solo recurso
router.get('/:id', studentCtrl.getStudent);
router.put('/:id', studentCtrl.updateStudent);
router.delete('/:id', studentCtrl.deleteStudent);

module.exports = router;