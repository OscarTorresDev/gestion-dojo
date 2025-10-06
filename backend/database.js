const mongoose = require('mongoose');

const URI = 'mongodb://localhost/dojovmc';

mongoose.connect(URI)
    .then(db => console.log('✅ Base de datos Dojo VMC conectada'))
    .catch(err => console.error('❌ Error de conexión:', err));

module.exports = mongoose;