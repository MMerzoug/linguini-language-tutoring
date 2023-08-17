const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');

const exphbs = require('express-handlebars');
const path = require('path');

const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const port = process.env.PORT || 3002;

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

// Start the server
sequelize.sync({force:false}).then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
