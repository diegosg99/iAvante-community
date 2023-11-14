const connection = require('../database');


//------------------------------------------------- LOBBY --------------------------------------------

exports.newLobby = (req, res) => {
          
    let data = req.body.lobby;

    console.log(data.lobby);

    try {

        let sql = `SELECT * 
                    FROM sala 
                    WHERE 
                            id_emisor = '${data.id_emisor}' 
                        AND 
                            id_receptor = '${data.id_receptor}';`;

        console.log(sql);

        connection.query(sql, function(err, rows, fields) {

            if (err) throw err;
            if (rows[0]) {
                res.status(201).json({msg:'Sala ya existente'});
            }else{
                sql = `INSERT INTO sala
                (uid,id_emisor,id_receptor)
                VALUES
                ('${data.uid}','${data.id_emisor}','${data.id_receptor}')`;

                connection.query(sql, function(err, rows, fields) {

                    if (err) throw err;
                    res.status(201).json({msg:'Sala creada'});
                });
            }
        });
    } catch (error) {
        res.status(500).json({ msg: 'Fallo del servidor' });
    }
};

exports.getLobby = (req, res) => {
    
    let data = req.params;

    try {
        let sql = `SELECT * 
                    FROM 
                        sala AS s
                    INNER JOIN
                        messages AS m
                    ON s.uid = m.id_sala
                    WHERE uid = '${data.uid}';`;

        
        connection.query(sql, function(err, rows, fields) {

            if (err) throw err;

            res.status(201).json(rows[0]);
        });
        
    } catch (error) {
        console.error('Fallo al traer eventos:', error);
        res.status(500).json({ error: 'Fallo al traer eventos' });
    }
};

exports.getUserLobbys = (req, res) => {
    
    let data = req.params;

    try {
        let sql = `SELECT * 
                    FROM 
                        sala AS s
                    WHERE s.id_emisor = '${data.uid}' OR s.id_receptor = '${data.uid}';`;
        
        connection.query(sql, function(err, rows, fields) {

            if (err) throw err;

            res.status(201).json(rows);
        });
        
    } catch (error) {
        console.error('Fallo al traer eventos:', error);
        res.status(500).json({ error: 'Fallo al traer eventos' });
    }
};

//----------------------------------------------- MESSAGES ------------------------------------------

exports.sendMessage = (req, res) => {
          
    let data = req.body;

    try {
        let sql = `INSERT INTO sala
                        (uid,id_emisor,id_receptor)
                        VALUES
                        ('${data.uid}','${data.id_emisor}','${data.id_receptor}')
                    `;

        
        connection.query(sql, function(err, rows, fields) {

            if (err) throw err;
            res.status(201).json({msg:'Sala creada'});
        });
        
    } catch (error) {
        res.status(500).json({ msg: 'Fallo al traer eventos' });
    }
};