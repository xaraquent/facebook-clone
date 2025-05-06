const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const friendsRoutes = require('./routes/friendsRoutes');
const usersRoutes = require('./routes/usersRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/facebook', friendsRoutes);
app.use('/facebook', usersRoutes);
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
