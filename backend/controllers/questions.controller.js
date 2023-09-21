const path = require('path');
const connection = require('../database');
const toolService = require('../services/tools.service');

exports.uploadQuestion = (req, res) => {
    let data = req.body;

    try {
        sql = `INSERT INTO questions 
                    (uid,title,body,user_id,category,views,comments,status,created_at,updated_at)
                VALUES 
                (
                    '${data.uid}',
                    '${data.title}',
                    '${data.body}',
                    '${data.usuario}',
                    '${data.category}',
                    ${data.views},
                    ${data.comments},
                    ${data.status},
                    '${data.created_at}',
                    '${data.updated_at}'
                )`;

                console.log(sql);

            connection.query(sql, function(err, rows, fields) {
                if (err) throw err;
                res.status(201).json({ message: 'Usuario registrado exitosamente',code:201 });
            });
        }
    catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.getAllQuestions = (req, res) => {
    const sql = 'SELECT * FROM questions';
    
    // SQL CON FOTO DEL USUARIO
    // const sql =`SELECT q.*,u.fullname,i.url 
    //                 FROM questions as q
    //                     INNER JOIN users as u 
    //                         on u.uid = q.user_id 
    //                     INNER JOIN media_users as m 
    //                         on u.photo = m.uid 
    //                     INNER JOIN images as i 
    //                     on m.id_media = i.id;`
    connection.query(sql, (err, rows) => {
      if (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      
        const filepath = path.resolve(rows[0].url);
        let base64image = toolService.convertImageToBase64(filepath);

        let newQuestion = {...rows[0],userImage:base64image}

        res.status(201).json(newQuestion);
    });
};  

exports.getCategoryQuestions = (req, res) => {

    console.log(req.params);

    const sql = `SELECT * FROM questions WHERE category = '${req.params.category}'`;

    connection.query(sql, (err, rows) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
      res.status(200).json(rows);
    });
};

exports.updateViews = (req, res) => {

    let sql = `UPDATE questions 
                SET views = ${req.body.views}                         
                WHERE uid = '${req.body.uid}'`;
               
                console.log(sql);

    connection.query(sql, (err, rows) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
      res.status(200).json(rows);
    });
};

exports.getQuestionComments = (req,res) => {
    
    let idQuestion = req.body.params.id;

    let sql = `SELECT * FROM comments WHERE id_post = '${idQuestion}'`;
               
                console.log(sql);

    connection.query(sql, (err, rows) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
      res.status(200).json(rows);
    });
}

exports.newComment = (req,res) => {
    let sql = `INSERT INTO questions 
                    (uid,id_post,id_user,body,likes,created_at,updated_at)
                    VALUES 
                        (
                            '${data.uid}',
                            '${data.id_post}',
                            '${data.id_user}',
                            '${data.body}',
                            '${data.likes}',
                            '${data.created_at}',
                            '${data.updated_at}'
                        )`;
               
                console.log(sql);

    connection.query(sql, (err, rows) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
      res.status(200).json(rows);
    });
}
