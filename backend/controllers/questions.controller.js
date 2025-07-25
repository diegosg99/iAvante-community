const path = require('path');
const connection = require('../database');
const toolService = require('../services/tools.service');
const questionService = require('../services/questions.service');
const reputationService = require('../services/reputation.service');
const { error } = require('console');

exports.uploadQuestion = (req, res) => {
    let data = req.body;

    try {
        sql = `INSERT INTO questions 
                    (uid,title,body,user_id,category,views,created_at,updated_at)
                VALUES 
                (
                    '${data.uid}',
                    '${data.title}',
                    '${data.body}',
                    '${data.usuario}',
                    '${data.category}',
                    ${data.views},
                    '${data.created_at}',
                    '${data.updated_at}'
                )`;

                console.log(sql);

            connection.query(sql, function(err, rows, fields) {
                if (err) throw err;

                let reputation = reputationService.setReputation('pregunta');

                sql = `UPDATE users set reputation=reputation+${reputation} WHERE uid = '${data.usuario}';`;
    
                connection.query(sql, function(err, rows, fields) {
    
                    if (err) throw err;
    
                    res.status(201).json({ message: 'Usuario registrado exitosamente',code:201 });
                })
            });
        }
    catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.getAllQuestions = (req, res) => {

    let newQuestions = [];

    const sql =`SELECT q.*,u.fullname,i.url,
    ( SELECT COUNT(c.uid) FROM comments_cat AS c WHERE c.id_cat = q.uid ) AS comments
                    FROM questions as q
                        INNER JOIN users as u 
                            on u.uid = q.user_id 
                        INNER JOIN media_users as m 
                            on u.photo = m.uid 
                        INNER JOIN images as i 
                        on m.id_media = i.id
                    ORDER BY q.created_at DESC;`

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

exports.getUserQuestions = (req, res) => {

    let uid = req.body.uid;

    let newQuestions = [];

    const sql = `SELECT q.*,u.fullname,i.url,count(cc.uid) as comments
                FROM questions as q
                    INNER JOIN users as u 
                        on u.uid = q.user_id 
                    INNER JOIN media_users as m 
                        on u.photo = m.uid 
                    INNER JOIN images as i 
                        on m.id_media = i.id
                        LEFT JOIN comments_cat AS cc 
                        ON cc.id_cat = q.uid
                    WHERE q.user_id = '${uid}'
                    GROUP BY q.uid, i.url;`;

        connection.query(sql, (err, rows) => {

            if (rows[0]) {
                rows.forEach(row => {
                    const filepath = path.resolve(row.url);
                    let base64image = toolService.convertImageToBase64(filepath);
        
                    newQuestions.push( {...row,url:base64image})//}
                });
    
                res.status(201).json(newQuestions);
            }else{
            res.status(301).json({error: 'No hay preguntas'});
            }
        });
};

exports.getUserResponses = (req, res) => {

    let uid = req.body.uid;

    console.log(uid);
    
    let data = {};

    const sql = `SELECT c.*,q.uid as q_id ,q.title
                    FROM comments AS c
                    INNER JOIN comments_cat as cc
                        ON cc.uid = c.id_cat
                    INNER JOIN questions AS q
                        ON q.uid = cc.id_cat
        WHERE c.id_user = '${uid}';`;

    connection.query(sql, (err, rows) => {
        if (rows[0]) {
            data.questions = rows;

            const sql = `SELECT c.*,p.uid as p_id,p.title
                        FROM comments AS c
                        INNER JOIN comments_cat as cc
                            ON cc.uid = c.id_cat
                        INNER JOIN posts AS p
                                        ON p.uid = cc.id_cat
                        WHERE c.id_user = '${uid}';`;

            connection.query(sql, (err, rows) => {

                    data.posts = rows;

                    res.status(201).json(data);
            })

        }else{
        res.status(301).json({error: 'No hay respuestas'});

        }
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
    
    let sql = `SELECT
    c.*,
    u.fullname,
    i.url
        FROM
            comments AS c
        INNER JOIN comments_cat AS cc
        ON
            c.id_cat = cc.uid
        INNER JOIN users AS u
        ON
            u.uid = c.id_user
        INNER JOIN media_users AS m
        ON
            u.photo = m.uid
        INNER JOIN images AS i
        ON
            m.id_media = i.id
        INNER JOIN questions AS q
        ON
            q.uid = cc.id_cat
        WHERE
            q.uid = '${uid}'
        ORDER BY
    c.created_at ASC;`;

                console.log(sql);
               
    connection.query(sql, (err, rows) => {
        if (err){
            console.log(error);
            res.status(301).json({message:'Hubo un error al conseguir los comentarios...'});
        }else{
            let filepath;
            let base64image;

            console.log(rows);

            rows.forEach(comment => {
                filepath = path.resolve(comment.url);
                base64image = toolService.convertImageToBase64(filepath);
                comment.url = base64image;
            })

            res.status(200).json(rows);
        }
    });
}

exports.getPostComments = (req,res) => {

    let uid = req.body.uid;

    //SELECT c.*,u.fullname,i.url FROM comments as c INNER JOIN comments_cat AS cat ON cat.uid = c.id_cat INNER JOIN users as u on u.uid = cat.id_user INNER JOIN media_users as m on u.photo = m.uid INNER JOIN images as i on m.id_media = i.id INNER JOIN posts as p on p.uid = cat.id_cat WHERE p.uid = '138a9219-ecfc-42ab-94ca-7ef3c74da24d' ORDER BY c.created_at ASC; 
    
    let sql = `SELECT
                    c.*,
                    u.fullname,
                    i.url
                FROM
                    comments AS c
                INNER JOIN comments_cat AS cc
                ON
                    c.id_cat = cc.uid
                INNER JOIN users AS u
                ON
                    u.uid = c.id_user
                INNER JOIN media_users AS m
                ON
                    u.photo = m.uid
                INNER JOIN images AS i
                ON
                    m.id_media = i.id
                INNER JOIN posts as p 
                    on p.uid = cc.id_cat 
                WHERE
                    p.uid = '${uid}'
                ORDER BY
                    c.created_at DESC;`;

                console.log(sql);
               
    connection.query(sql, (err, rows) => {
        if (err){
            console.log(error);
            res.status(301).json({message:'Hubo un error al conseguir los comentarios...'});
        }else{
            let filepath;
            let base64image;

            console.log(rows);

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

    let uid = toolService.uuidv4();

    let sql = `INSERT INTO comments_cat
                    (uid,id_user,id_cat,type)
                VALUES 
                (
                    '${uid}',
                    '${data.usuario}',
                    '${data.preguntaId}',
                    '${data.type}'
                )`;

    connection.query(sql, (err, rows) => {
        if (err) {
            console.error('Error fetching users:', err);
        }
        sql = `INSERT INTO comments 
                        (uid,id_cat,id_user,body,created_at,updated_at)
                    VALUES 
                    (
                        '${data.uid}',
                        '${uid}',
                        '${data.usuario}',
                        '${data.respuesta}',
                        '${data.fechaCreacion}',
                        '${data.fechaActualizacion}'
                    )`;

    connection.query(sql, (err, rows) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        let reputation = reputationService.setReputation('respuesta');

            sql = `UPDATE users set reputation=reputation+${reputation} WHERE uid = '${data.usuario}';`;

            connection.query(sql, function(err, rows, fields) {

                if (err) throw err;

                res.status(200).json({code:201,message: 'Comentario publicado con éxito',data:rows});
            })
        });
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

exports.deleteUserQuestion = (req,res) => {
    let uid = req.body.uid;

    try {
            // SELECT p.*,u.* FROM posts AS p INNER JOIN users AS u ON p.user_id = u.uid INNER JOIN follows AS f ON f.follower = u.uid WHERE u.uid IN (SELECT followed FROM follows WHERE follower ='cec24f1b-1d57-4bd2-a71f-bfd10584ecf2'); 
        const sql = 
            `DELETE FROM questions WHERE uid = '${uid}';`;
        connection.query(sql, (err, rows) => {
            if (err) {
                console.error('Error deleting question:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }else{
                res.status(200).json({message: 'Pregunta eliminado con éxito.'});
            }
        });
    } catch (error) {
        console.log(error);
    }
}

exports.deleteUserResponse = (req,res) => {
    let uid = req.body.uid;

    try {
            // SELECT p.*,u.* FROM posts AS p INNER JOIN users AS u ON p.user_id = u.uid INNER JOIN follows AS f ON f.follower = u.uid WHERE u.uid IN (SELECT followed FROM follows WHERE follower ='cec24f1b-1d57-4bd2-a71f-bfd10584ecf2'); 
        const sql = 
            `DELETE FROM comments WHERE uid = '${uid}';`;
        connection.query(sql, (err, rows) => {
            if (err) {
                console.error('Error deleting response:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }else{
                res.status(200).json({message: 'Respuesta eliminado con éxito.'});
            }
        });
    } catch (error) {
        console.log(error);
    }
}