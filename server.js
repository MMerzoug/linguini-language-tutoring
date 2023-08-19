require('dotenv').config();
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const { initializePassport } = require('./passport-config');
const flash = require('express-flash');
const session = require('express-session');

initializePassport(passport);

const app = express();
const port = process.env.PORT || 3001;

//handlebars setup
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// writes the failed messages
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//routes middleware
app.use(routes);

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
