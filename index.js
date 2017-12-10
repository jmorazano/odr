const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const router = require('./routers/router.js');
const expReact = require('express-react-views');
const config = require('./config');
const mongoose = require('mongoose');
// User auth dependencies
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

if (config.envVariables) {
  dotenv.load();
}

mongoose.Promise = require('bluebird');

// DB connection
app.db = mongoose.connect(config.dbUrl, {
  useMongoClient: true,
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TURN ON COOKIES
// COOKIEHASH in your .env file (must be available on heroku)
app.use(cookieParser(process.env.COOKIEHASH));

// STORE SESSION IN MONGODB
// MongoStore for session storage is using the connect-mongodb module

app.use(
  session({
    secret: process.env.COOKIEHASH,
    store: new MongoStore({
      url: config.dbUrl,
    }),
    resave: false,
    saveUninitialized: false,
  })
);

// TURN ON PASSPORT AUTHENTICATION MODULE
app.use(passport.initialize());
app.use(passport.session());

// PREPARE User module - set up models
const User = require('./models/user.js');

// Configure passport to use Passport Local strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ---------------------------------------

// Configure react views
app.engine('jsx', expReact.createEngine());
app.set('views', __dirname + '/views/');
app.set('view engine', 'jsx');

// Use Mocks
if (config.useMocks) {
  console.log('---- Using Mocks ----');
  require('./mocks');
}

// Define routes
router.init(app, __dirname);

// Start Application
app.listen(config.port, config.host, () => {
  console.log(`App started: ${config.host}:${config.port}`);
});
