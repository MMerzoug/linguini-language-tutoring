const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');

const exphbs = require('express-handlebars');
const path = require('path');

const session = require('express-session');

// const mysql = require('mysql');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const port = process.env.PORT || 3001;

//handlebars setup
const hbs = exphbs.create({ });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//session setup
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(session(sess));

//body parsin middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static files middleware
app.use(express.static(path.join(__dirname, 'public')));

//routes middleware
app.use(routes);

// // Define the connection to the MySQL database
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// connection.connect(err => {
//   if (err) {
//     console.error(err);
//     throw err;
//   }

//   console.log('Connection to MySQL database established');
// });

// Start the server
sequelize.sync({force:false}).then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
