const db = require('../db/connection');

// Obtener todas las habitaciones
exports.getHabitaciones = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM habitaciones');
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// Obtener una habitación por código
exports.getHabitacionById = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM habitaciones WHERE codigo = ?', [req.params.codigo]);
    if (rows.length === 0) return res.status(404).json({ error: 'Habitación no encontrada' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

// Crear nueva habitación
exports.createHabitacion = async (req, res, next) => {
  try {
    const { numero, tipo, valor } = req.body;
    const [result] = await db.query('INSERT INTO habitaciones (numero, tipo, valor) VALUES (?, ?, ?)', [numero, tipo, valor]);
    res.status(201).json({ codigo: result.insertId, numero, tipo, valor });
  } catch (err) {
    next(err);
  }
};

// Actualizar habitación
exports.updateHabitacion = async (req, res, next) => {
  try {
    const { numero, tipo, valor } = req.body;
    const [result] = await db.query('UPDATE habitaciones SET numero = ?, tipo = ?, valor = ? WHERE codigo = ?', [numero, tipo, valor, req.params.codigo]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Habitación no encontrada' });
    res.json({ mensaje: 'Habitación actualizada' });
  } catch (err) {
    next(err);
  }
};

// Eliminar habitación
exports.deleteHabitacion = async (req, res, next) => {
  try {
    const [result] = await db.query('DELETE FROM habitaciones WHERE codigo = ?', [req.params.codigo]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Habitación no encontrada' });
    res.json({ mensaje: 'Habitación eliminada' });
  } catch (err) {
    next(err);
  }
};
