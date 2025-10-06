const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },  // ¡Debe ser Number!
    course: { type: String, required: true },
    grade: { type: Number, required: true } // ¡Debe ser Number!
});

module.exports = mongoose.model('Student', StudentSchema); 