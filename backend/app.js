const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const friendsRoutes = require('./routes/friendsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const groupRoutes = require('./routes/groupRoutes');
const postRoutes = require('./routes/postRoutes');
const commentsRoutes = require('./routes/commentsRoutes');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/facebook', friendsRoutes);
app.use('/facebook', usersRoutes);
app.use('/facebook', groupRoutes);
app.use('/facebook', postRoutes);
app.use('/facebook', commentsRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
