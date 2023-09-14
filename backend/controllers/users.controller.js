const connection = require('../database');
const authService = require('../services/auth.service');
const jwt = require("jsonwebtoken");
const sharp = require("sharp");
const multer = require("multer");

const secret = "Bearer";

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, '../uploads/images')
    },
    filename: (req,file,cb) => {
        const ext = file.originalname.split('.').pop()
        cb(null,`${Date.now()}.${ext}`)
    }
})

const upload = multer({storage});

// Controlador para loguear un usuario
exports.loginUser = async (req, res) => {
    let data = req.body;

    const payload = {
        sub: data.email,
    }
      
    console.log(data);

    const token = jwt.sign(payload,secret,{expiresIn: "1hr"});
    
    try {
        let sql = `SELECT password FROM users WHERE email = '${data.email}'`;

        if (data.email && data.password){
            connection.query(sql, function(err, rows, fields) {
                
                if (err) throw err;

                authService.comparePassword(data.password,rows[0].password).then(logged => {
                    return logged?
                    res.status(201).json({ message: 'Usuario logueado exitosamente',token,code:201 }):
                    res.status(301).json({ message: 'Credenciales incorrectas',code:301 });
                })
            });
        }
    } catch (error) {
        console.error('Credenciales incorrectas:', error);
        res.status(500).json({ error: 'Credenciales incorrectas' });
    }
};

exports.verifyToken = (req, res) => {
    const token = req.body.token;

    try {
        const decoded = jwt.verify(token,secret); //Asegurarse de que funciona

        const sql = `SELECT * FROM users where email = '${decoded.sub}'`;

        return decoded.sub?
        connection.query(sql, (err, rows) => {
            res.status(201).json(rows[0]);
          }):
            res.status(301).json({ message: 'JWT No válido',decoded,code:301 })
    } catch (error) {
        return res.status(500).json({ message: 'Error verificando',code:500 });
    }

    
}

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
    const sql = 'SELECT * FROM users';
    connection.query(sql, (err, rows) => {
      if (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json(rows);
    });
};

exports.getUserByEmail = (req, res) => {
    let email = req.params.email;

    const sql = `SELECT * FROM users where email = '${email}'`;

    console.log(sql);

    try {
        connection.query(sql, (err, rows) => {

            if (err) {
                console.error('Error fetching users:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
              }
            res.status(201).json(rows[0]);
          });   
    } catch (error) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.uploadImage = (req,res) => {
    
}