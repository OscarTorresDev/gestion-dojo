const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const { mongoose } = require('./database');
const studentRoutes = require('./routes/student.routes');
const senseiRoutes = require('./routes/sensei.routes');
const adminRoutes = require('./routes/admin.routes');

// Configuraciones
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: '*' })); 
// Rutas
app.use('/api/students', studentRoutes);
app.use('/api/senseis', senseiRoutes);
app.use('/api/admins', adminRoutes);

// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log('Servidor activo en el puerto', app.get('port'))
});