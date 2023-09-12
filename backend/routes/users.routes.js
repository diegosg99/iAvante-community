const express = require('express');
const router = express.Router();
const {connection} = require ('../database');

router.get('/users',(req,res) => {
    try{
        let sql = `SELECT * FROM users;`;
        console.log(sql);
        console.log(connection);

        connection.query(sql, function(err, rows, fields) {
            if (err) throw err;
            res.status(200).send({rows});
            });
    }catch(error){
        console.log(req)
        res.status(400).send({msg:"Error"});
    }
})

router.put('/user/update',(req,res) => {
    try{
      let data = req.body;
    
      let timestamp = moment().unix();
    
      let sql = `UPDATE users 
                    SET uid='${data.uid}',
                    username='${data.name}',
                    email='${data.surname}',
                    fullname='${data.fullname}',
                    age='${data.age}',
                    photo='${data.photo}',
                    profession='${data.profession}',
                    instagram='${data.instagram}',
                    twitter='${data.twitter}',
                    facebook='${data.facebook}',
                    linkedin='${data.linkedin}'
                    WHERE uid = '${data.uid}';`;
    
      connection.query(sql, function(err, rows, fields) {
          if (err) throw err;
          res.status(200).send(data);
          });
    }catch(error) {
      res.status(400).send(req);
    }
    })

router.get('/user/:uid',(req,res) => {
    try{
        let data = req.params.uid;
        let sql = `SELECT * FROM users WHERE uid = '`+data+`';`;
        connection.query(sql, function(err, rows, fields) {
            if (err) throw err;
            res.status(200).send({rows});
            });
    }catch(error){
        res.status(400).send({msg:"Error"});
    }
})

module.exports = router;