import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
// Set up the express app
const app = express();
const routes = require('./routes')
// get all todos


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});
app.set('port', process.env.PORT || 8080)
app.use(passport.initialize());


//Entry points

module.exports = app
  