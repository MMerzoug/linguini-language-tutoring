/* Imports */
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');

const exphbs = require('express-handlebars');
const path = require('path');

const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const port = process.env.PORT || 3001;

/* Handelbars setup */
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

/* Session setup  */
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
    db: sequelize,
  }),
};

/* Application setup */
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Static folder setup */
app.use(express.static(path.join(__dirname, 'public')));

/* Routes setup */
app.use(routes);

/* Sync sequelize */
sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
