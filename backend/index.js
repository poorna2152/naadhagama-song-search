const express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/config')
var cors = require('cors');
var searchRoutes = require('./routes/search');

const app = express();
const port = config.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());
app.use('/search', searchRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to song metaphor search engine!');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
