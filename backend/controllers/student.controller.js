const Student = require('../models/student.model'); // Importar el Modelo

const studentCtrl = {}; // Objeto del Controlador

// 1. Obtener todos los estudiantes (GET /api/students)
studentCtrl.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'Error interno al obtener estudiantes' });
    }
};

// 2. Crear estudiante (POST /api/students) - Manejo de Error 400
studentCtrl.createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(200).json({ status: 'Estudiante guardado' }); // Devolvemos 200 OK
    } catch (error) {
        // Capturar Error de Validación de Mongoose (400)
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                error: 'Fallo de validación de Mongoose',
                details: error.message, // Mensaje detallado de Mongoose (qué campo falló)
                dataReceived: req.body // Mostrar qué datos envió el frontend
            });
        }
        // Error del servidor (500)
        res.status(500).json({ error: 'Error interno al guardar estudiante' });
    }
};

// 3. Obtener un estudiante por ID (GET /api/students/:id)
studentCtrl.getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: 'Error interno al obtener estudiante por ID' });
    }
};

// 4. Actualizar estudiante (PUT /api/students/:id) - Manejo de Error 400
studentCtrl.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const studentUpdated = req.body; 

        // runValidators: true asegura que las reglas del modelo se apliquen también al actualizar
        await Student.findByIdAndUpdate(id, { $set: studentUpdated }, { new: true, runValidators: true });
        res.status(200).json({ status: 'Estudiante actualizado' });
    } catch (error) {
         if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                error: 'Fallo de validación de Mongoose al actualizar',
                details: error.message
            });
        }
        res.status(500).json({ error: 'Error interno al actualizar estudiante' });
    }
};

// 5. Eliminar estudiante (DELETE /api/students/:id)
studentCtrl.deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: 'Estudiante eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno al eliminar estudiante' });
    }
};

module.exports = studentCtrl;