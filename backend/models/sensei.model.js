const mongoose = require('mongoose');
const { Schema } = mongoose;

const SenseiSchema = new Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true }, // Ejemplo: "Karate", "Judo"
    rank: { type: String, required: true }      // Ejemplo: "5to Dan", "Cinta Negra"
});

module.exports = mongoose.model('Sensei', SenseiSchema);