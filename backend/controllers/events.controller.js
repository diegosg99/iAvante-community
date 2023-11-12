const connection = require('../database');

exports.getEvents = (req, res) => {
          
    try {
        let sql = `SELECT * FROM events;`;

        
        connection.query(sql, function(err, rows, fields) {

            if (err) throw err;

            res.status(201).json(rows);
        });
        
    } catch (error) {
        console.error('Fallo al traer eventos:', error);
        res.status(500).json({ error: 'Fallo al traer eventos' });
    }
};

exports.uploadEvent = (req, res) => {
          
    let data = req.body;

    try {
        let sql = `INSERT INTO events 
                        (uid,name,description,date,start,end,province,street)
                    VALUES 
                    (
                        '${data.uid}',
                        '${data.title}',
                        '${data.description}',
                        '${data.date}',
                        '${data.start}',
                        '${data.end}',
                        '${data.province}',
                        '${data.street}'
                    )`;
        
        connection.query(sql, function(err, rows, fields) {

            if (err) throw err;

            res.status(201).json({code:201});
        });
        
    } catch (error) {
        console.error('Fallo al subir evento:', error);
        res.status(500).json({ code: 301 });
    }
};

exports.removeEvent = (req, res) => {
          
    let data = req.body;

    try {
        let sql = `DELETE FROM events WHERE uid = '${data.uid}';`;

        
        connection.query(sql, function(err, rows, fields) {

            if (err) throw err;

            res.status(201).json(rows);
        });
        
    } catch (error) {
        console.error('Fallo al eliminar evento:', error);
        res.status(500).json({ error: 'Fallo al eliminar evento' });
    }
};