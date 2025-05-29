const db = require('../db/connection');

// Obtener todas las reservas
exports.getReservas = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM reservas');
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// Obtener una reserva por código
exports.getReservaById = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM reservas WHERE codigo = ?', [req.params.codigo]);
    if (rows.length === 0) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

// Crear nueva reserva
exports.createReserva = async (req, res, next) => {
  try {
    const { codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida } = req.body;
    const [result] = await db.query(
      `INSERT INTO reservas (codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida]
    );
    res.status(201).json({ codigo: result.insertId });
  } catch (err) {
    next(err);
  }
};

// Actualizar reserva
exports.updateReserva = async (req, res, next) => {
  try {
    const { codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida } = req.body;
    const [result] = await db.query(
      `UPDATE reservas SET codigo_habitacion = ?, nombre_cliente = ?, telefono_cliente = ?, fecha_reservacion = ?, fecha_entrada = ?, fecha_salida = ?
       WHERE codigo = ?`,
      [codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida, req.params.codigo]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json({ mensaje: 'Reserva actualizada' });
  } catch (err) {
    next(err);
  }
};

// Eliminar reserva
exports.deleteReserva = async (req, res, next) => {
  try {
    const [result] = await db.query('DELETE FROM reservas WHERE codigo = ?', [req.params.codigo]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json({ mensaje: 'Reserva eliminada' });
  } catch (err) {
    next(err);
  }
};
