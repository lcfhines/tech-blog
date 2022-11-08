// dependencies
const path = require('path');
const express = require('express');
const session = require ('express-session');
const exphbs = require('express-handlebars');

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('.utils/helpers');

// set up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// set up sessions
const sess = {
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require(routes));

// start the server
app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});