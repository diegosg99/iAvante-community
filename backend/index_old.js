//-------------------------------- SETTINGS --------------------------------

const express = require("express");
const cors = require("cors");
const moment = require('moment');
const bcrypt = require("bcrypt");
const morgan = require('morgan');

const router = express.Router();

            //---------------------- CONSTS
const formatComplete = 'YYYY-MM-DD HH:mm:ss'
const PORT = 3003;

const app = express();

app.set('port', process.env.PORT || PORT);
app.use(express.json({limit: '500mb'}));
app.use(morgan('dev'));
app.use(cors);

//--------------------------------------- MIDDLEWARES --------------------------------------

//-------------Encode/Decode Passwords------------------

encodePassword = async (password) => {
const hash = await bcrypt.hash(password, 10);
return hash;
}

comparePassword = async (plaintextPassword, hash) => {
const result = await bcrypt.compare(plaintextPassword, hash);
return result;
}

//--------------------------------------- ROUTES -------------------------------------------

const usersRoutes = require('./routes/users.routes');
app.use('/api', usersRoutes);

//-------------------- Start Server ------------------------------------

app.listen(app.get('port'), () =>
console.log(`¡Aplicación escuchando en el puerto ${app.get('port')}!`),
);