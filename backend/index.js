const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3003;

const connection = require('./database');
const usersRoutes = require('./routes/users.routes'); // Importa las rutas

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Usa las rutas importadas
app.use('/api', usersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
