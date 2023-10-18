const path = require('path');
const connection = require('../database');
const toolService = require('../services/tools.service');
const questionService = require('../services/questions.service');
const { error } = require('console');

exports.uploadQuestion = (req, res) => {
    let data = req.body;

    console.log(data);

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

    let newQuestions = [];

    const sql =`SELECT q.*,u.fullname,i.url 
                    FROM questions as q
                        INNER JOIN users as u 
                            on u.uid = q.user_id 
                        INNER JOIN media_users as m 
                            on u.photo = m.uid 
                        INNER JOIN images as i 
                        on m.id_media = i.id;`

    connection.query(sql, (err, rows) => {

        if (rows[0]) {
            rows.forEach(row => {
                const filepath = path.resolve(row.url);
                let base64image = toolService.convertImageToBase64(filepath);
    
                newQuestions.push( {...row,userImage:base64image})//}
            });
                
            console.log(newQuestions);

            let processedData = {};

            processedData.top = questionService.sortTopQuestions(newQuestions);
            processedData.recent = questionService.sortRecentQuestions(newQuestions);

            res.status(201).json(processedData);
        }
        //res.status(301).json({error: 'No hay preguntas'});
    });
};  

exports.getCategoryQuestions = (req, res) => {

    let newQuestions = [];

    const sql = `SELECT q.*,u.fullname,i.url 
    FROM questions as q
        INNER JOIN users as u 
            on u.uid = q.user_id 
        INNER JOIN media_users as m 
            on u.photo = m.uid 
        INNER JOIN images as i 
        on m.id_media = i.id
        WHERE q.category = '${req.params.category}'`;

        connection.query(sql, (err, rows) => {

            if (rows[0]) {
                rows.forEach(row => {
                    const filepath = path.resolve(row.url);
                    let base64image = toolService.convertImageToBase64(filepath);
        
                    newQuestions.push( {...row,userImage:base64image})//}
                });
                    
                console.log(newQuestions);
    
                let processedData = {};
    
                processedData.top = questionService.sortTopQuestions(newQuestions);
                processedData.recent = questionService.sortRecentQuestions(newQuestions);
    
                res.status(201).json(processedData);
            }
            //res.status(301).json({error: 'No hay preguntas'});
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

    let uid = req.body.uid;
    
    let sql = `SELECT c.*,u.fullname,i.url 
                FROM comments as c 
                    INNER JOIN users as u 
                        on u.uid = c.id_user 
                    INNER JOIN media_users as m 
                        on u.photo = m.uid 
                    INNER JOIN images as i 
                        on m.id_media = i.id 
                    INNER JOIN questions as q 
                        on q.uid = c.id_post 
                WHERE q.uid = '${uid}'
                ORDER BY c.created_at ASC;`;
               
    connection.query(sql, (err, rows) => {
        if (err){
            console.log(error);
            res.status(301).json({message:'Hubo un error al conseguir los comentarios...'});
        }else{
            let filepath;
            let base64image;

            rows.forEach(comment => {
                filepath = path.resolve(comment.url);
                base64image = toolService.convertImageToBase64(filepath);
                comment.url = base64image;
            })

            res.status(200).json(rows);
        }
    });
}

exports.newComment = (req,res) => {

    let data = req.body;

    let sql = `INSERT INTO comments 
                    (uid,id_post,id_user,body,likes,created_at,updated_at)
                VALUES 
                (
                    '${data.uid}',
                    '${data.preguntaId}',
                    '${data.usuario}',
                    '${data.respuesta}',
                    '${data.likes}',
                    '${data.fechaCreacion}',
                    '${data.fechaActualizacion}'
                )`;

    connection.query(sql, (err, rows) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
      res.status(200).json({message: 'Comentario publicado con éxito',data:rows});
    });
}

exports.getQuestion = (req,res) => {

    let newQuestion = {};
    let response = {}

    let sql =`SELECT q.*,u.fullname,i.url 
                    FROM questions as q
                        INNER JOIN users as u 
                            on u.uid = q.user_id 
                        INNER JOIN media_users as m 
                            on u.photo = m.uid 
                        INNER JOIN images as i 
                        on m.id_media = i.id
                        WHERE q.uid = '${req.params.id}';`

    connection.query(sql, (err, rows) => {

        if (rows[0]) {
                        
            const filepath = path.resolve(rows[0].url);
            let base64image = toolService.convertImageToBase64(filepath);

            newQuestion = {...rows[0],userImage:base64image}

            response = newQuestion;
            res.status(200).json(response);
        }else{
            res.status(301).json({message:'Hubo un error'});
        }
    });
}