const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
var cc = require('currency-converter')({
  CLIENTKEY: 'e078470a907d46ee9cfd96dda585d5f7',
  fetchInterval: 3600000,
});

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);

cc.convert(100, 'USD', 'EUR').then(function(result) {
  console.log(result.amount);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const auth = require('./services/auth.js');
app.use(auth.passportInstance);
app.use(auth.passportSession);

app.use(morgan('dev'));

app.use(cookieParser());

app.listen(port, () => {
  console.log('Server started on ' + port);
});

const housesRouter = require('./controllers/houses.js');
const neighborsRouter = require('./controllers/neighbors.js');
const usersRouter = require('./controllers/users.js');

app.use('/houses', housesRouter);
app.use('/neighbors', neighborsRouter);
app.use('/users', usersRouter);

app.use((err, req, res, next) => {
  console.log('Error encountered:', err);
  res.status(500);
  res.send(err);
});
