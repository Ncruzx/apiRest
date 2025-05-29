const express = require('express');
const app = express();
require('dotenv').config();

// Rutas
const habitacionesRoutes = require('./src/routes/habitaciones.routes');
const reservasRoutes = require('./src/routes/reservas.routes');
const errorHandler = require('./src/middlewares/errorHandler');

app.use(express.json());

app.use('/rooms', habitacionesRoutes);
app.use('/bookings', reservasRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});
