const connection = require('../database');
const authService = require('../services/auth.service');

const STATES = ['Cerrada','Abierto','Cancelado'];

exports.changeStatus = async (req, res) => {
  
    const data = req.body;

    try {
        const sql = `SELECT u.*,i.url as url
        FROM media_users as m 
            INNER JOIN users as u 
            ON u.photo = m.uid 
            INNER JOIN images as i 
                ON m.id_media = i.id
        WHERE u.email = '${data.sub}'`;

        return decoded.sub?
        connection.query(sql, (err, rows) => {
            const filepath = path.resolve(rows[0].url);

            let base64img = toolService.convertImageToBase64(filepath);
            let newUser = {...rows[0],url:base64img};

            res.status(201).json(newUser);
          }):
            res.status(301).json({ message: 'JWT No válido',decoded,code:301 })
    } catch (error) {
        return res.status(500).json({ message: 'Error verificando',code:500 });
    }
};

exports.getStatus = async (req, res) => {
  
    const data = req.body;

    try {
        const sql = `SELECT u.*,i.url as url
        FROM media_users as m 
            INNER JOIN users as u 
            ON u.photo = m.uid 
            INNER JOIN images as i 
                ON m.id_media = i.id
        WHERE u.email = '${data.sub}'`;

        return decoded.sub?
        connection.query(sql, (err, rows) => {
            const filepath = path.resolve(rows[0].url);

            let base64img = toolService.convertImageToBase64(filepath);
            let newUser = {...rows[0],url:base64img};

            res.status(201).json(newUser);
          }):
            res.status(301).json({ message: 'JWT No válido',decoded,code:301 })
    } catch (error) {
        return res.status(500).json({ message: 'Error verificando',code:500 });
    }
};