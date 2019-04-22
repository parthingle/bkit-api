import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes'
import passport from 'passport'
import * as FB from './auth/fb'

const app = express()


app.set('port', process.env.PORT || 8080)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/status', (req, res) => {
  res.status(200).send({message: "Listening"})
})
app.use(passport.initialize());
FB.setStrategy()
app.use('/', routes)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  console.log(err)
  return res.json({ status: err.status || 500, message: 'Error!' })
})


module.exports = app