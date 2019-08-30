import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import usersRouter from 'routes/users';
import sessionsRouter from 'routes/sessions';
import indexRouter from 'routes/index';
import postsRouter from 'routes/posts';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
import session from 'express-session';

const app = express();

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(json());
app.use(bodyParser.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'cats' }));
app.use(express.static(join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', sessionsRouter);
app.use('/', postsRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

// Passport
passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: 'incorect username' });
      }

      if (!user.validPassword(password)) {
        return done(null, false, { message: 'incorect password' });
      }

      return done(null, user);
    });
  }),
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
