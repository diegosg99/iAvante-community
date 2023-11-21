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

exports.getEvent = (req, res) => {
    
    let data = req.params;

    try {
        let sql = `SELECT * FROM events WHERE uid = '${data.id}';`;

        
        connection.query(sql, function(err, rows, fields) {

            if (err) throw err;

            res.status(201).json(rows[0]);
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
                        (uid,name,description,date,maxPeople,start,end,province,street)
                    VALUES 
                    (
                        '${data.uid}',
                        '${data.title}',
                        '${data.description}',
                        '${data.date}',
                        '${data.maxPeople}',
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

exports.subscribeEvent = (req, res) => {
          
    let data = req.body;

    try {
        let sql = `INSERT INTO event_users 
                    (uid,user,event) 
                VALUES 
                    ('${data.uid+'&&'+data.event}','${data.uid}','${data.event}');`;

        
        connection.query(sql, function(err, rows, fields) {

            if (err) throw err;

            res.status(201).json(rows);
        });
        
    } catch (error) {
        console.error('Fallo al registrar en el evento:', error);
        res.status(500).json({ error: 'Fallo al registrar en el evento' });
    }
};

exports.unsubscribeEvent = (req, res) => {
          
    let data = req.body;

    let uid = data.uid+'&&'+data.event;

    try {
        let sql = `DELETE FROM event_users WHERE uid = '${uid}';`;

        
        connection.query(sql, function(err, rows, fields) {

            if (err) throw err;

            res.status(201).json(rows);
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Fallo al desuscribirse del evento' });
    }
};

exports.getPeopleSubscribed = (req, res) => {
          
    let data = req.body;

    try {
        let sql = `SELECT * FROM event_users WHERE event = '${data.uid}';`;

        
        connection.query(sql, function(err, rows, fields) {

            if (err) throw err;

            res.status(201).json(rows.length);
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Fallo al traer info del evento' });
    }
};

exports.isSubbed = (req, res) => {
          
    let data = req.body;

    try {
        let sql = `SELECT * FROM event_users WHERE uid = '${data.uid+'&&'+data.event}';`;

        
        connection.query(sql, function(err, rows, fields) {

            if (err) throw err;

            if (rows[0]){
                res.status(201).json(true);
            }else{
                res.status(201).json(false);
            }
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Fallo al traer info del evento' });
    }
};