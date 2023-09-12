const connection = require('../database');

// Controlador para obtener todos los usuarios
exports.getAllUsers = (req, res) => {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (err, rows) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(rows);
  });
};

// Controlador para actualizar un usuario
exports.updateUser = (req, res) => {
  // Implementa la lógica para actualizar un usuario aquí
};

// Controlador para obtener un usuario por su ID
exports.getUserById = (req, res) => {
  // Implementa la lógica para obtener un usuario por su ID aquí
};