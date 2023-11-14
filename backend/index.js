const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3003;

const usersRoutes = require('./routes/users.routes');
const questionRoutes = require('./routes/questions.routes');
const followRoutes = require('./routes/follow.routes');
const postRoutes = require('./routes/posts.routes');
const mediaRoutes = require('./routes/media.routes');
const likeRoutes = require('./routes/like.routes');
const eventRoutes = require('./routes/events.routes');
const chatRoutes = require('./routes/chat.routes');

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(morgan('dev'));

// Usa las rutas importadas
app.use('/api', usersRoutes);
app.use('/api', questionRoutes);
app.use('/api', followRoutes);
app.use('/api', postRoutes);
app.use('/api', mediaRoutes);
app.use('/api', likeRoutes);
app.use('/api', eventRoutes);
app.use('/api', chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
