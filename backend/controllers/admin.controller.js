const Admin = require('../models/admin.model'); // <-- IMPORTANTE

const adminCtrl = {};

adminCtrl.getAdmins = async (req, res) => {
    try {
        // En una app real, no listarías la clave, pero la listamos para el CRUD
        const admins = await Admin.find(); 
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener administradores' });
    }
};

adminCtrl.createAdmin = async (req, res) => {
    try {
        const admin = new Admin(req.body);
        await admin.save();
        res.status(200).json({ status: 'Administrador guardado' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Fallo de validación', details: error.message });
        }
        res.status(500).json({ error: 'Error interno al guardar administrador' });
    }
};

adminCtrl.getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        res.json(admin);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener administrador' });
    }
};

adminCtrl.updateAdmin = async (req, res) => {
    try {
        await Admin.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
        res.status(200).json({ status: 'Administrador actualizado' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Fallo de validación', details: error.message });
        }
        res.status(500).json({ error: 'Error al actualizar administrador' });
    }
};

adminCtrl.deleteAdmin = async (req, res) => {
    try {
        await Admin.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: 'Administrador eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar administrador' });
    }
};

module.exports = adminCtrl;