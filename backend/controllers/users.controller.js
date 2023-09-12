const connection = require('../database');
const authService = require('../services/auth.service');

// Controlador para registrar un nuevo usuario
exports.registerUser = async (req, res) => {
    let data = req.body;

    try {
        // Codificar la contraseña antes de guardarla en la base de datos
        const hashedPassword = await authService.hashPassword(data.password);
        
        let sql = `INSERT INTO users 
                            (uid,username,email,fullname,password,age,photo)
                        VALUES 
                        (
                            '${data.uid}',
                            '${data.username}',
                            '${data.email}',
                            '${data.fullName}',
                            '${hashedPassword}',
                            '${data.age}',
                            '${data.photo}'
                        )`;

        if (data.username && data.email && data.fullName && hashedPassword){
            connection.query(sql, function(err, rows, fields) {
                if (err) throw err;
                res.status(201).json({ message: 'Usuario registrado exitosamente',code:201 });
            });
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

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