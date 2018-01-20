const express = require('express');
const bodyParser = require('body-parser');
const expReact = require('express-react-views');
const mongoose = require('mongoose');
const flash = require('express-flash');

// User auth dependencies
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Create App
const app = express();
const router = require('./routers/router.js');
const config = require('./config');

if (config.envVariables) {
  dotenv.load();
}

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB connection
mongoose.Promise = require('bluebird');

app.db = mongoose.connect(config.dbUrl, {
  useMongoClient: true,
});

// TURN ON COOKIES
// COOKIEHASH in your .env file (must be available on heroku and be the same)
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

// Notifications module Sessions needed ^ TODO: NOT WORKING
// app.use(flash());
// app.use((req, res, next) => {
//   // flash a message
//   req.flash('info', 'hello!');
//   console.log('FLASH ON INDEX', res.locals);
//   next();
// });

// TURN ON PASSPORT AUTHENTICATION MODULE
app.use(passport.initialize());
app.use(passport.session());

// PREPARE User module - set up models
const User = require('./models/user.js');

// Configure passport to use Passport Local strategy
// passport.use(new LocalStrategy(User.authenticate()));
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'Incorrect username.' });
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    });
  })
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ---------------------------------------

// Configure react views
app.engine('jsx', expReact.createEngine());
app.set('views', __dirname + '/views/');
app.set('view engine', 'jsx');

// Use Mocks TODO: analyze use of mocks for ODR
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
