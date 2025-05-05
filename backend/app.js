const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Route for the endpoint for
const friendsRoutes = require('./routes/friendsRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/facebook', friendsRoutes);
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
