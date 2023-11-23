const connection = require('../database');
const toolService = require("../services/tools.service");
const reputationService = require("../services/reputation.service");
const path = require('path');


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

            let reputation = reputationService.setReputation('asistencia');

            sql = `UPDATE users set reputation=reputation+${reputation} WHERE uid = '${data.uid}';`;

            connection.query(sql, function(err, rows, fields) {

                if (err) throw err;

                res.status(201).json(rows);  
            })
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

exports.uploadEventMedia = async (req, res) => {
    
    let files = req.files;

    try {
        let index = 1;
        files.forEach(file => {

            let uidPost = file.originalname.split('.')[1];
            let ids = uploadImageToDB(file);
    
            let sql = `UPDATE events 
                            SET media${index} = '${ids.mediaUID}'                        
                            WHERE uid = '${uidPost}'`;    
            
            connection.query(sql, function(err, rows, fields) {
                if (err) throw err;
            });
            index++;
        })
        return res.status(201).json({code:201,message:'Fotos linkeadas al evento'})
    }
    catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

uploadImageToDB = (data) => {

    let category = data.originalname.split('.')[0];
    let uidPhoto = data.originalname.split('.')[2];
    let uidPost = data.originalname.split('.')[1];
    let mime = data.mimetype.split('/')[0]+'s';

    let mediaUID = toolService.uuidv4();

    let sql = `INSERT INTO ${mime} 
                    (id,url)
                VALUES 
                (
                    '${uidPhoto}',
                    '${data.destination+data.filename}'
                )`;

    connection.query(sql, function(err, rows, fields) {if (err){console.log(err)}});

    sql = `INSERT INTO media_users 
                    (uid,id_cat,id_media,media_type)
                VALUES 
                (
                    '${mediaUID}',
                    '${uidPost}',
                    '${uidPhoto}',
                    '${category}'
                )`;

    connection.query(sql, function(err, rows, fields) {if (err){console.log(err)}});

    return {mediaUID: mediaUID};
}