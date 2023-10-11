const connection = require('../database');
const toolService = require('../services/tools.service');

exports.uploadPost = (req, res) => {
    let data = req.body;
    
    try {
        
        let sql = `
        INSERT INTO posts 
            (uid,title,body,user_id,status,created_at)
        VALUES 
        (
            '${data.uid}',
            '${data.title}',
            '${data.descripcion}',
            '${data.usuario}',
            '1',
            '${data.fechaCreacion}'
        )`;

        connection.query(sql, function(err, rows, fields) {
            if (err){
                res.status(301).json({ message: 'Error al subir el post',code:301 });
            }else {
                    sql = `
                        SELECT * FROM posts 
                            WHERE uid = 
                            '${data.uid}';`;
                    connection.query(sql, function(err, rows, fields) {
                        if (err){
                            res.status(301).json({ message: 'Error al subir el post',code:301 });
                        }else{
                            res.status(201).json({ data: rows[0],code:201 })
                        }
                    })
                }
        })
    } catch (error) {
        console.error('Algo ha salido mal:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.uploadPostMedia = async (req, res) => {
    
    let files = req.files;

    try {
        let index = 1;
        files.forEach(file => {
            let uidPost = file.originalname.split('.')[1];
    
            let ids = uploadImageToDB(file);
    
            let sql = `UPDATE posts 
                            SET media${index} = '${ids.mediaUID}'                        
                            WHERE uid = '${uidPost}'`;    
            connection.query(sql, function(err, rows, fields) {
                if (err) throw err;
            });
            index++;
        })
        return res.status(201).json({code:201,message:'Fotos linkeadas al post'})
    }
    catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

exports.getFollowedPosts = (req,res) => {
    let uid = req.body.uid;

    try {
            // SELECT p.*,u.* FROM posts AS p INNER JOIN users AS u ON p.user_id = u.uid INNER JOIN follows AS f ON f.follower = u.uid WHERE u.uid IN (SELECT followed FROM follows WHERE follower ='cec24f1b-1d57-4bd2-a71f-bfd10584ecf2'); 

        const sql = 
            `SELECT p.*,u.*,u.uid AS user_id 
            FROM posts AS p 
                INNER JOIN users AS u 
                    ON p.user_id = u.uid
            WHERE u.uid 
            IN (SELECT followed 
                FROM follows 
                WHERE follower ='${uid}'); `;
        connection.query(sql, (err, rows) => {
            if (err) {
                console.error('Error fetching posts:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }else{
                console.log(rows);
                console.log(sql);
                res.status(200).json(rows);
            }
        // const filepath = path.resolve(rows[0].url);
        // base64img = toolService.convertImageToBase64(filepath);
        // newPost = {...rows[0],url:base64img};
        });
    } catch (error) {
        console.log(error);
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

getUserFollows = (uid) => {
    const sql = `SELECT followed
    FROM follows
    WHERE follower ='${uid}'`;
    connection.query(sql, (err, rows) => {
      if (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return rows;
    });
}