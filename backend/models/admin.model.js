    const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
    username: { type: String, required: true, unique: true },
    // NOTA: En un proyecto real, se debe hashear la clave con bcrypt, pero la dejaremos como string simple por ahora.
    key: { type: String, required: true } 
});

module.exports = mongoose.model('Admin', AdminSchema);