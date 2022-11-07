// dependencies
const express = require('express');
const session = require ('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const path = require('path');
const hbs = exphbs.create({});

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// set up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// assign hbs.engine to label 'handlebars' 
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.static(path.join(__dirname, 'public')));
app.use(require(routes));

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});