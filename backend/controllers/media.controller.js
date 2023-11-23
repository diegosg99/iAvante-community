const connection = require('../database');
const authService = require('../services/auth.service');
const toolService = require('../services/tools.service');
const jwt = require("jsonwebtoken");
const path = require("path");
const mime = require('mime');
var fs = require("fs");

exports.getProfilePicture = async (req, res) => {
    let data = req.body;
          
    try {
        let sql = `SELECT i.url 
                        FROM users as u 
                            INNER JOIN media_users as m 
                                ON u.photo = m.uid 
                            INNER JOIN images as i 
                                ON m.id_media = i.id
                        WHERE u.uid = '${data.uid}';`;

    connection.query(sql, function(err, rows, fields) {

    const filepath = path.resolve(rows[0].url);

    let base64img = toolService.convertImageToBase64(filepath);
    
    if (err) {
            res.status(301).json({ message: err,code:301 });
        }else{
            res.status(201).json({ url:base64img });
        }

    });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error });
    }
};

exports.getMediaPost = async (req, res) => {
    let data = req.body;
    let id = data.id;

    console.log(data);

    if (id===undefined){
        res.status(300).json({ err: 'foto nula'});
    }
          
    try {

        let sql;

            sql = `SELECT i.url
            FROM media_users as m 
                INNER JOIN images as i 
                    ON m.id_media = i.id
            WHERE m.uid = '${id}';`;

            connection.query(sql, function(err, rows, fields) {
                const filepath = path.resolve(rows[0].url);
                let base64img = toolService.convertImageToBase64(filepath);
                if(err){
                res.status(300).json({ err:err });
                }

                res.status(200).json({ url: base64img });
            });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error });
    }
};

exports.getMediaEvent = async (req, res) => {
    let data = req.body;
    let id = data.id;

    console.log(data);

    if (id===undefined){
        res.status(300).json({ err: 'foto nula'});
    }
          
    try {

        let sql;

            sql = `SELECT i.url
            FROM media_users as m 
                INNER JOIN images as i 
                    ON m.id_media = i.id
            WHERE m.uid = '${id}';`;

            connection.query(sql, function(err, rows, fields) {
                const filepath = path.resolve(rows[0].url);
                let base64img = toolService.convertImageToBase64(filepath);
                if(err){
                res.status(300).json({ err:err });
                }

                res.status(200).json({ url: base64img });
            });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error });
    }
};