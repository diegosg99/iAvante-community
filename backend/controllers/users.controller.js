const connection = require('../database');
const authService = require('../services/auth.service');
const toolService = require('../services/tools.service');
const jwt = require("jsonwebtoken");
const path = require("path");
const mime = require('mime');
var fs = require("fs");

const secret = "Bearer";

exports.loginUser = async (req, res) => {
    let data = req.body;

    const payload = {
        sub: data.email,
    }
      
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

        const sql = `SELECT u.*,i.url as url
        FROM media_users as m 
            INNER JOIN users as u 
            ON u.photo = m.uid 
            INNER JOIN images as i 
                ON m.id_media = i.id
        WHERE u.email = '${decoded.sub}'`;

        return decoded.sub?
        connection.query(sql, (err, rows) => {
            const filepath = path.resolve(rows[0].url);

            let base64img = toolService.convertImageToBase64(filepath);
            let newUser = {...rows[0],url:base64img};

            res.status(201).json(newUser);
          }):
            res.status(301).json({ message: 'JWT No válido',decoded,code:301 })
    } catch (error) {
        return res.status(500).json({ message: 'Error verificando',code:500 });
    }
}

exports.registerUser = async (req, res) => {
    let data = req.body;

    try {
        const hashedPassword = await authService.hashPassword(data.password);
        
        let sql = `SELECT * FROM users WHERE email = '${data.email}'`;

        connection.query(sql, function(err, rows, fields) {
            if (rows[0]){
                res.status(301).json({ message: 'email already exists',code:301 });
            }else {
                sql = `INSERT INTO users 
                            (uid,username,email,fullname,password,age,photo)
                        VALUES 
                        (
                            '${data.uid}',
                            '${data.username}',
                            '${data.email}',
                            '${data.fullName}',
                            '${hashedPassword}',
                            '${data.age}',
                            '""'
                        )`;

        if (data.username && data.email && data.fullName && hashedPassword){
            connection.query(sql, function(err, rows, fields) {

                let sql = `SELECT * FROM users WHERE email = '${data.email}'`;

                connection.query(sql, function(err, rows, fields) {
                    res.status(201).json({ data: rows[0],code:201 });
                })
            });
        }
    }
    })

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.getAllUsers = (req, res) => {

    let base64img;
    let newUser;
    let usersData = [];

  const sql = `
  SELECT u.*,i.url as url
  FROM media_users as m 
      INNER JOIN users as u 
            ON u.photo = m.uid 
      INNER JOIN images as i 
            ON m.id_media = i.id`;
  connection.query(sql, (err, rows) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    rows.forEach(row => {
        const filepath = path.resolve(row.url);

        base64img = toolService.convertImageToBase64(filepath);
        newUser = {...row,url:base64img};
        usersData.push(newUser);
    });

    res.status(200).json(usersData);
  });
};

exports.getFullDataUsers = (req, res) => {

    let base64img;
    let newUser;
    let usersData = [];

  const sql = `
  SELECT
    u.*,
    i.url AS url,
    (SELECT count(uid) FROM posts WHERE user_id = u.uid) as posts,
    (SELECT count(followed) FROM follows WHERE follower = u.uid) as following,
    (SELECT count(follower) FROM follows WHERE followed = u.uid) as followers
    FROM
        media_users AS m
    INNER JOIN users AS u
        ON u.photo = m.uid
    INNER JOIN images AS i
        ON m.id_media = i.id`;
        
  connection.query(sql, (err, rows) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    rows.forEach(row => {
        const filepath = path.resolve(row.url);

        base64img = toolService.convertImageToBase64(filepath);
        newUser = {...row,url:base64img};
        usersData.push(newUser);
    });

    res.status(200).json(usersData);
  });
};

exports.updateUser = (req, res) => {
    let data = req.body;

    console.log(data);

    let sqlFields = '';

    Object.entries(data).forEach(entry => {
        const [i, value] = entry;
        if (value) {
            sqlFields+=i+'="'+value+'",'
        }
    });

    sqlFields = sqlFields.substring(0, sqlFields.length - 1);

    try {
        let sql = `UPDATE users SET 
                        ${sqlFields}                            
                    WHERE uid = '${data.uid}'`;

            console.log(sql);

            connection.query(sql, function(err, rows, fields) {
                if (err) throw err;
                res.status(201).json({ message: 'Usuario registrado exitosamente',code:201 });
            });
        }
    catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.getUserById = (req, res) => {

    let uid = req.params.uid;

    const sql = `SELECT u.*,i.url as url
    FROM media_users as m 
        INNER JOIN users as u 
              ON u.photo = m.uid 
        INNER JOIN images as i 
              ON m.id_media = i.id
    WHERE u.uid ='${uid}'`;

    console.log(sql);

    connection.query(sql, (err, rows) => {
      if (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const filepath = path.resolve(rows[0].url);

        base64img = toolService.convertImageToBase64(filepath);
        newUser = {...rows[0],url:base64img};

      res.status(200).json(newUser);
    });
};

exports.getUserByEmail = (req, res) => {
    let email = req.params.email;

    const sql = `SELECT * FROM users where email = '${email}'`;

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

    try {
        let category = req.file.originalname.split('.')[0];
        let uid = req.file.originalname.split('.')[1];

        let ids = uploadImageToDB(req.file);

        let sql = `UPDATE users 
                        SET photo = '${ids.mediaUID}'                        
                        WHERE uid = '${uid}'`;    
        connection.query(sql, function(err, rows, fields) {
            if (err) throw err;
            return res.status(201).json({code:201,file:req.file})
        });
    }
    catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// exports.getImage = (req,res) => {
//     try {
//         let category = req.file.originalname.split('.')[0];
//         let uid = req.file.originalname.split('.')[1];
//     }
//     catch (error) {
//         console.error('Error al registrar usuario:', error);
//         res.status(500).json({ error: 'Error interno del servidor' });
//     }
// }
//---------------------Linkea el contenido de media con el usuario

uploadImageToDB = (data) => {

    let uid = data.originalname.split('.')[1];
    let imageUID = toolService.uuidv4();
    let mediaUID = toolService.uuidv4();

    let sql = `INSERT INTO images 
                    (id,url)
                VALUES 
                (
                    '${imageUID}',
                    '${data.destination+"/"+data.filename}'
                )`;

    connection.query(sql, function(err, rows, fields) {if (err){console.log(err)}});

    sql = `INSERT INTO media_users 
                    (uid,id_cat,id_media,media_type)
                VALUES 
                (
                    '${mediaUID}',
                    '${uid}',
                    '${imageUID}',
                    'profile'
                )`;
    connection.query(sql, function(err, rows, fields) {if (err){console.log(err)}});

    return {mediaUID: mediaUID,imageUID: imageUID};
}