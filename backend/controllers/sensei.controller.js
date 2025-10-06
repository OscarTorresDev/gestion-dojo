const Sensei = require('../models/sensei.model'); // <-- IMPORTANTE

const senseiCtrl = {};

senseiCtrl.getSenseis = async (req, res) => {
    try {
        const senseis = await Sensei.find();
        res.json(senseis);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener senseis' });
    }
};

senseiCtrl.createSensei = async (req, res) => {
    try {
        const sensei = new Sensei(req.body);
        await sensei.save();
        res.status(200).json({ status: 'Sensei guardado' });
    } catch (error) {
        // Manejo de error de validación de Mongoose
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Fallo de validación', details: error.message });
        }
        res.status(500).json({ error: 'Error interno al guardar sensei' });
    }
};

senseiCtrl.getSensei = async (req, res) => {
    try {
        const sensei = await Sensei.findById(req.params.id);
        res.json(sensei);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener sensei' });
    }
};

senseiCtrl.updateSensei = async (req, res) => {
    try {
        await Sensei.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
        res.status(200).json({ status: 'Sensei actualizado' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Fallo de validación', details: error.message });
        }
        res.status(500).json({ error: 'Error al actualizar sensei' });
    }
};

senseiCtrl.deleteSensei = async (req, res) => {
    try {
        await Sensei.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: 'Sensei eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar sensei' });
    }
};

module.exports = senseiCtrl;