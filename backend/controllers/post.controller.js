const connection = require('../database');
const authService = require('../services/auth.service');
const toolService = require('../services/tools.service');
const jwt = require("jsonwebtoken");
const path = require("path");
const mime = require('mime');
var fs = require("fs");

const secret = "Bearer";

exports.uploadPost = (req, res) => {
    let data = req.body.post;

    let files = {column:'',id:''};
    let count = 1;

    console.log(data);

    data.files.forEach(file => {
        files = {...{column:files.column+`,media${count}`,id:files.id+`,'uid'`}};
        count++;
    });
    
    try {
        
        let sql = `
        INSERT INTO posts 
            (uid,title,body,user_id,status,created_at${files.column})
        VALUES 
        (
            '${data.uid}',
            '${data.title}',
            '${data.descripcion}',
            '${data.usuario}',
            '1',
            '${data.fechaCreacion}'${files.id}
        )`;

        connection.query(sql, function(err, rows, fields) {
            if (err){
                res.status(301).json({ message: 'Error al subir el post',code:301 });
            }else {
                res.status(201).json({ message: 'Post subido con exito',code:201 });
        }
    })

    } catch (error) {
        console.error('Algo ha salido mal:', error);
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