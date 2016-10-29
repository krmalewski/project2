/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint key-spacing: ["error", { align: "value" }] */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const dotEnv          = require('dotenv').config({silent: true});
const express         = require('express');
const logger          = require('morgan');
const bodyParser      = require('body-parser');
const methodOverride  = require('method-override');
const path            = require('path');
const session         = require('express-session');
const cookieParser    = require('cookie-parser');



// Set up routes
const homeRoute       = require('./routes/home');
const authRouter      = require('./routes/auth');
const usersRouter     = require('./routes/users');
const exploreRoute    = require('./routes/explore');
const searchRoute     = require('./routes/search');
const mapRoute        = require('./routes/maps');

const app             = express();
const PORT            = process.argv[2] || process.env.PORT || 3000;
const SECRET          = 'tacos3000';

// set default templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// set up logger so that we can see what is happening
app.use(logger('dev'));

// set static assets path
app.use(express.static(path.join(__dirname, 'public')));

// middleware to receive form inputs
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// middleware for method override, allowing our deletes and puts to work
app.use(methodOverride('_method'));

// This is how we read the cookies sent over from the browser
app.use(cookieParser());

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SECRET
}));

// tell our server to listen to port
app.listen(PORT, () => console.log('Server is up and running on port ', PORT));

app.use('/', homeRoute);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/explore', exploreRoute);
app.use('/search', searchRoute);
app.use('/maps', mapRoute);

