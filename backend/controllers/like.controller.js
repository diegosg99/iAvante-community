const path = require('path');
const connection = require('../database');
const reputationService = require('../services/reputation.service');


exports.like = (req, res) => {
    let data = req.body;

    try {
        sql = `INSERT INTO likes 
                    (uid,user,target)
                VALUES 
                (
                    '${data.user}&&${data.target}',
                    '${data.user}',
                    '${data.target}'
                )`;

        console.log(sql);

        connection.query(sql, function(err, rows, fields) {
            if (err) throw err;

            let reputation = reputationService.setReputation('like');

            sql = `UPDATE users set reputation=reputation+${reputation} WHERE uid = '${data.user}';`;

            connection.query(sql, function(err, rows, fields) {

                if (err) throw err;

                res.status(201).json({ message: 'Like registrado',code:201 });
            })
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.unlike = (req, res) => {
    let data = req.body;

    try {
        sql = `DELETE FROM likes 
                WHERE 
                    user = '${data.user}' 
                AND
                    target = '${data.target}';`;

        connection.query(sql, function(err, rows, fields) {
            if (err) throw err;
            res.status(201).json({ message: 'Like registrado',code:201 });
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.getLikes = (req, res) => {

    let data = req.body;

    const sql =`SELECT * 
                FROM likes
                    WHERE target = '${data.target}';`

    connection.query(sql, (err, rows) => {

        if (rows[0]) {
            res.status(201).json(rows);
        }else{
            res.status(301).json({msg: 'No hay likes'});
        }
    });
};

exports.getNumLikes = (req, res) => {

    let data = req.body;

    const sql =`SELECT COUNT(*) as likes
                FROM likes
                    WHERE target = '${data.target}';`

    connection.query(sql, (err, rows) => {

        if (rows[0]) {
            res.status(201).json(rows[0]);
        }
        res.status(301).json({msg: 'No hay likes'});
    });
};