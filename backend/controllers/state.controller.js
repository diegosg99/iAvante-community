const connection = require('../database');

// const STATES = ['Cerrada','Abierto','Cancelado'];

exports.setStatus = async (req, res) => {
  
    const data = req.body;

    try {
        const sql = `UPDATE ${data.table}
        SET status = ${data.status}
        WHERE uid = '${data.uid}';`;

        console.log(sql);

        connection.query(sql, (err, rows) => {
            if(err){
            res.status(301).json({message:'Error cambiando el estado'});
            }else{
                res.status(201).json({message:'Estado cambiado'});
            }
        })
    } catch (error) {
        return res.status(500).json({ message: 'Error cambiando estado' });
    }
};

exports.getStatus = async (req, res) => {
  
    const data = req.body;

    try {
        const sql = `SELECT *
                    FROM ${data.table}
                    WHERE uid = '${data.uid}'`;


        connection.query(sql, (err, rows) => {
            if(err){
                res.status(301).json({message:'Error cambiando el estado'});
            }else{
                res.status(201).json({message:'Estado cambiado'});
            }
        })
    } catch (error) {
        return res.status(500).json({ message: 'Error cambiando estado' });
    }
};