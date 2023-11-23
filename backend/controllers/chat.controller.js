const path = require('path');
const connection = require('../database');
const toolService = require('../services/tools.service');

const util = require('util');
const queryAsync = util.promisify(connection.query);

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
        let sql = `SELECT s.*, u.fullname, i.url 
                    FROM sala AS s 
                        INNER JOIN users AS u 
                            ON u.uid = s.id_emisor || u.uid = s.id_receptor 
                        INNER JOIN media_users AS m 
                            ON u.photo = m.uid 
                        INNER JOIN images AS i 
                            ON m.id_media = i.id 
                    WHERE s.uid = '${data.uid}';`;

        
        connection.query(sql, function(err, rows, fields) {

            if (err) throw err;

            res.status(201).json(rows);
        });
        
    } catch (error) {
        console.error('Fallo al traer eventos:', error);
        res.status(500).json({ error: 'Fallo al traer eventos' });
    }
};

exports.getLobbyData = (req, res) => {
    
    let data = req.params;

    try {
        let sql = `SELECT
                        m.*,
                        u.fullname,
                        i.url
                    FROM
                        sala AS s
                    INNER JOIN messages AS mes
                    ON
                        s.uid = mes.id_sala
                    INNER JOIN users AS u
                    ON
                        u.uid = mes.id_user
                    INNER JOIN media_users AS m
                    ON
                        u.photo = m.uid
                    INNER JOIN images AS i
                    ON
                        m.id_media = i.id
                    WHERE
                        s.uid = '${data.uid}';`;

        
        connection.query(sql, function(err, rows, fields) {

            if (err) throw err;

            res.status(201).json(rows[0]);
        });
        
    } catch (error) {
        console.error('Fallo al traer eventos:', error);
        res.status(500).json({ error: 'Fallo al traer eventos' });
    }
};

// exports.getUserLobbys = async (req, res) => {
    
//     let data = req.params;

//     let lobbysData = [];

//     try {
//         let sql = `SELECT s.* 
//                     FROM messages AS mes 
//                         INNER JOIN sala AS s 
//                             ON mes.id_sala = s.uid 
//                         INNER JOIN users AS u 
//                             ON u.uid = mes.id_user 
//                     WHERE mes.id_user = '${data.uid}';`;
        
//         connection.query(sql, function (err, rows, fields) {

//             if (err) throw err;

//             else {
//                 rows.forEach(row => {
//                     sql = `SELECT s.*, u.fullname, i.url 
//                     FROM sala AS s 
//                         INNER JOIN messages AS mes 
//                             ON s.uid = mes.id_sala 
//                         INNER JOIN users AS u 
//                             ON u.uid = mes.id_user 
//                         INNER JOIN media_users AS m 
//                             ON u.photo = m.uid 
//                         INNER JOIN images AS i ON m.id_media = i.id 
//                     WHERE 
//                             s.uid = '${row.uid}' 
//                         AND 
//                             u.uid != '${data.uid}';`
                    
//                     connection.query(sql, function(err, rows, fields) {
                        
//                         const filepath = path.resolve(rows[0].url);
//                         let base64image = toolService.convertImageToBase64(filepath);
//                         lobbysData.push({...rows[0],userImage:base64image});
//                     })
//                 });
//                 console.log('RESPUESTA-------->')
//                 console.log(lobbysData);
//             }
//         });
//         res.status(201).json(await lobbysData);                        
//     } catch (error) {
//         console.error('Fallo al traer eventos:', error);
//         res.status(500).json({ error: 'Fallo al traer eventos' });
//     }
// };

//----------------------------------------------- MESSAGES ------------------------------------------

//CHATGPT

exports.getUserLobbys = (req, res) => {
    let data = req.params;
    let lobbysData = [];

    const queryAsync = (sql) => {
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, rows, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    };

    const processRow = async (row) => {
        const sql = `SELECT s.*, u.fullname, i.url 
                    FROM sala AS s 
                        INNER JOIN messages AS mes 
                            ON s.uid = mes.id_sala 
                        INNER JOIN users AS u 
                            ON u.uid = mes.id_user 
                        INNER JOIN media_users AS m 
                            ON u.photo = m.uid 
                        INNER JOIN images AS i ON m.id_media = i.id 
                    WHERE 
                            s.uid = '${row.uid}' 
                        AND 
                            u.uid != '${data.uid}';`;

        const result = await queryAsync(sql);
        const filepath = path.resolve(result[0].url);
        let base64image = toolService.convertImageToBase64(filepath);
        lobbysData.push({ ...result[0], userImage: base64image });
    };

    const sql = `SELECT s.* 
                FROM messages AS mes 
                    INNER JOIN sala AS s 
                        ON mes.id_sala = s.uid 
                    INNER JOIN users AS u 
                        ON u.uid = mes.id_user 
                WHERE mes.id_user = '${data.uid}';`;

    queryAsync(sql)
        .then(async (rows) => {
            const processPromises = rows.map(processRow);
            await Promise.all(processPromises);
            res.status(201).json(lobbysData);
        })
        .catch((error) => {
            console.error('Fallo al traer eventos:', error);
            res.status(500).json({ error: 'Fallo al traer eventos' });
        });
};

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