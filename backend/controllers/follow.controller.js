const connection = require('../database');

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

exports.getFollows = (req, res) => {
    let data = req.body;

    try {
        
        let sql = `SELECT * FROM follows AS f WHERE f.both = '${data.both}'`;

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