const connection = require('../database');
const path = require('path');
const toolService = require('../services/tools.service');
const { error } = require('console');

exports.follow = (req, res) => {

    let data = req.body;

    try {
        const sql = `INSERT INTO follows 
        VALUES ('${data.followed}','${data.follower}','${data.both}');`;

        connection.query(sql, (err, rows) => {
            if (err) {
                res.status(301).json(false)
            }else{
                res.status(201).json(true);
            }
          })
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor',code:500 });
    }
}

exports.unfollow = (req, res) => {
    let data = req.body;

    try {        
        let sql = `DELETE FROM follows WHERE follows.both = '${data.both}'`;

        console.log(sql);

        connection.query(sql, function(err, rows, fields) {
            if (err){
                res.status(301).json(true);
            }else {
        res.status(201).json(false);
    }
    })

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json(true);
    }
};

exports.checkFollow = (req, res) => {
    let data = req.body;

    try {
        let sql = `SELECT * FROM follows AS f WHERE f.both = '${data.both}'`;

        connection.query(sql, function(err, rows, fields) {
            if (err) {console.log(err)};
            if (rows[0]){
                res.status(201).json(true);
            }else {
                res.status(301).json(false);
            }
        })
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor',code:500 });
    }
};

exports.getFollows = (req, res) => { //TODO: modificar consulta para traer datos de cada usuari y foto
    let data = req.body; 

    console.log(data);

    try {
        
        let sql = `SELECT f.followed FROM follows AS f WHERE f.follower = '${data.uid}'`;

        console.log(sql);

        connection.query(sql, function(err, rows, fields) {
            if (!rows[0]){
                res.status(301).json({ sql:sql,code:301 });
            }else {
                console.log(rows);
                let data = [];

                rows.forEach(row => {
                    data.push(row.followed)
                });

                console.log(data);

                res.status(201).json({ data: data,code:201 });
    }
    })

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.getFollowsData = (req, res) => { //TODO: modificar consulta para traer datos de cada usuari y foto
    let data = req.body; 
    let newUsers = [];

    try {
        
        let sql = `SELECT u.*,i.url
                    FROM follows AS f 
                        INNER JOIN users AS u 
                            ON u.uid = f.followed 
                        INNER JOIN media_users AS m 
                            ON u.photo = m.uid 
                        INNER JOIN images AS i 
                            ON m.id_media = i.id 
                    WHERE f.follower = '${data.uid}';`;

        console.log(sql);

        connection.query(sql, function(err, rows, fields) {
            if (!rows[0]){
                

                res.status(301).json({ sql:sql,code:301 });
            }else {
                rows.forEach(row => {
                    const filepath = path.resolve(row.url);
                    let base64image = toolService.convertImageToBase64(filepath);
        
                    newUsers.push( {...row,userImage:base64image})//}
                })

                res.status(201).json(newUsers);
    }
    })

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.getFollowers = (req, res) => {
    let data = req.body;

    try {
        
        let sql = `SELECT * FROM users WHERE email = '${data.email}'`;

        connection.query(sql, function(err, rows, fields) {
            if (rows[0]){
                res.status(301).json({ message: 'email already exists',code:301 });
            }else {
                res.status(201).json({ data: rows[0],code:201 });
    }
    })

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


exports.getFollowersData = (req, res) => { //TODO: modificar consulta para traer datos de cada usuari y foto
    let data = req.body; 
    let newUsers = [];

    try {
        
        let sql = `SELECT u.*,i.url
                    FROM follows AS f 
                        INNER JOIN users AS u 
                            ON u.uid = f.follower 
                        INNER JOIN media_users AS m 
                            ON u.photo = m.uid 
                        INNER JOIN images AS i 
                            ON m.id_media = i.id 
                    WHERE f.followed = '${data.uid}';`;

        console.log(sql);

        connection.query(sql, function(err, rows, fields) {
            if (!rows[0]){
                res.status(301).json({ sql:sql,code:301 });
            }else {
                rows.forEach(row => {
                    const filepath = path.resolve(row.url);
                    let base64image = toolService.convertImageToBase64(filepath);
        
                    newUsers.push( {...row,userImage:base64image})//}
                })

                res.status(201).json(newUsers);
            }
        })

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};