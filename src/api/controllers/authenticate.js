import User from 'models/user';
import Token from 'models/token';
import jwt from 'jsonwebtoken';

exports.isAuthenticated = function(req, res, next) {
  console.log(req.headers['authorization']);
  if (req.headers) {
    let jwtToken = req.headers['authorization'];
    if (jwtToken) {
      jwt.verify(jwtToken, process.env.ACCESS_TOKEN_PRIVATE_KEY, function(
        err,
        payload,
      ) {
        if (err) {
          res.status(401).json({
            message: 'Token is valid',
          });
        } else {
          let userId = payload.id;
          User.findById(userId, function(err, user) {
            if (user) {
              let hash_token = payload.hash_token;
              console.log(`isAuthenticated token_id ${hash_token}`);
              Token.findOne({ hash_token: hash_token }, function(err, token) {
                if (token) {
                  console.log(`isAuthenticated then ${token}`);
                  req.current_user = user;
                  req.hash_token = payload.hash_token;
                  next();
                } else {
                  res.status(401).json({
                    message: 'Not authentication',
                    error: err,
                  });
                }
              });
            } else {
              res.status(401).json({
                message: 'Not authorize',
                error: err,
              });
            }
          });
        }
      });
    } else {
      res.status(401).json({
        message: 'Not authentication',
      });
    }
  } else {
    res.status(401).json({
      error: 'Not authentication',
    });
  }
};
