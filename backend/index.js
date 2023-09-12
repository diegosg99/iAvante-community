// //-------------------------------- SETTINGS --------------------------------

// const express = require("express");
// const cors = require("cors");
// //const mysql = require('mysql');
// const moment = require('moment');
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const morgan = require('morgan');

// //const {connection,adminDB} = require ('./database');  --------------------> externalizacion de BD pero da error

//             //---------------------- CONSTS
// const formatComplete = 'YYYY-MM-DD HH:mm:ss'
// const PORT = 3003;
// const SECRET = "614f4f4a6568e9ae881c76e8753f65c9";

// const app = express();
// app.set('port', process.env.PORT || PORT);

// app.use(express.json({limit: '500mb'}));
// app.use(cors());
// app.use(morgan('dev'));


//             //----------------------BD Alumnos
// // const connection = mysql.createConnection({
// //   host     : 'localhost',
// //   user     : 'root',
// //   password : '',
// //   database : 'community'
// // });

// // connection.connect(err => {
// //   err ?console.error('error connecting: ' + err.stack)
// //   :console.log('connected as id ' + connection.threadId);
// // });

// //--------------------------------------- MIDDLEWARES --------------------------------------

// //-------------Encode/Decode Passwords------------------

// encodePassword = async (password) => {
// const hash = await bcrypt.hash(password, 10);
// return hash;
// }

// comparePassword = async (plaintextPassword, hash) => {
// const result = await bcrypt.compare(plaintextPassword, hash);
// return result;
// }

// //--------------------------------------- ROUTES -------------------------------------------

// const {connection} = require ('./database');

// app.get('/users',(req,res) => {
// try{
//     let sql = `SELECT * FROM users;`;
//     connection.query(sql, function(err, rows, fields) {
//         if (err) throw err;
//         res.status(200).send({rows});
//         });
// }catch(error){
//     res.status(400).send({msg:"Error"});
// }
// })

// app.put('/user/update',(req,res) => {
//     try{
//       let data = req.body;
    
//       let timestamp = moment().unix();
    
//       let sql = `UPDATE users 
//                     SET uid='${data.uid}',
//                     username='${data.name}',
//                     email='${data.surname}',
//                     fullname='${data.fullname}',
//                     age='${data.age}',
//                     photo='${data.photo}',
//                     profession='${data.profession}',
//                     instagram='${data.instagram}',
//                     twitter='${data.twitter}',
//                     facebook='${data.facebook}',
//                     linkedin='${data.linkedin}'
//                     WHERE uid = '${data.uid}';`;
    
//       connection.query(sql, function(err, rows, fields) {
//           if (err) throw err;
//           res.status(200).send(data);
//           });
//     }catch(error) {
//       res.status(400).send(req);
//     }
//     })

// // app.use(require('./routes/students.routes'));

// //-------------------- Start Server ------------------------------------
// app.listen(app.get('port'), () =>
// console.log(`¡Aplicación escuchando en el puerto ${app.get('port')}!`),
// );



const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3003;

const connection = require('./database'); // Importa la conexión

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Define tus rutas y controladores aquí, utilizando la variable 'connection' cuando sea necesario.

app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (err, rows) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(rows);
  });
});

// Resto de tus rutas y lógica de la aplicación

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});