const connection = require('../database');
const authService = require('../services/auth.service');
const toolService = require('../services/tools.service');
const jwt = require("jsonwebtoken");
const path = require("path");
const mime = require('mime');
var fs = require("fs");

const secret = "Bearer";

exports.uploadPost = (req, res) => {
    let data = req.body;

    // let files = {column:'',id:''};
    // let count = 1;

    // Array.from(req.body.files).forEach(file => {
    //     files = {...{column:files.column+`,media${count}`,id:files.id+`,'uid'`}};
    //     count++;
    // });
    
    try {
        
        let sql = `
        INSERT INTO posts 
            (uid,title,body,user_id,status,created_at)
        VALUES 
        (
            '${data.uid}',
            '${data.title}',
            '${data.descripcion}',
            '${data.usuario}',
            '1',
            '${data.fechaCreacion}'
        )`;

        connection.query(sql, function(err, rows, fields) {
            if (err){
                res.status(301).json({ message: 'Error al subir el post',code:301 });
            }else {
                    sql = `
                        SELECT * FROM posts 
                            WHERE uid = 
                            '${data.uid}';`;
                    connection.query(sql, function(err, rows, fields) {
                        if (err){
                            res.status(301).json({ message: 'Error al subir el post',code:301 });
                        }else{
                            res.status(201).json({ data: rows[0],code:201 })
                        }
                    })
                }
        })
    } catch (error) {
        console.error('Algo ha salido mal:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.uploadPostMedia = async (req, res) => {
    
    let files = req.files;
    console.log('files:');
    console.log(files);
    try {
        files.forEach(file => {
            let category = req.file.originalname.split('.')[0];
            let uidUser = req.file.originalname.split('.')[1];
            let uidPost = req.file.originalname.split('.')[2];
    
            let ids = uploadImageToDB(file);
    
            let sql = `UPDATE users 
                            SET photo = '${ids.mediaUID}'                        
                            WHERE uid = '${uidPost}'`;    
            connection.query(sql, function(err, rows, fields) {
                if (err) throw err;
                return res.status(201).json({code:201,file:req.file})
            });
        })
    }
    catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

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