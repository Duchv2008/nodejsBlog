import User from "models/user";
import Token from "models/token";
import jwt from "jsonwebtoken";
var randtoken = require("rand-token");

const create = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({username: username})
    .then((user) => {
      if (user.comparePassword(password)) { 
        var hash_token = randtoken.generate(16);
        Token.findOneAndUpdate({user_id: user.id}, { $set: {hash_token: hash_token, user_id: user.id}}, {upsert: true, new: true}, function(err, token) {
          if (err) {
            res.status(401).json({
              "error": e
            });
          } else {
            let created_at = Date.now();
            res.json({
              "access_token": user.generateJWTToken(created_at, hash_token),
              "refresh_token": user.generateJWTRefreshToken(created_at)
            });
          }
        });
      } else {
        res.status(401).json({
          "error": "Login faile 2"
        });
      }
    }, (e) => {
      res.status(401).json({
        "error": "Login faile 3"
      });
    });
};

const refreshToken = (req, res) => {
  let refresh_token = req.body.refresh_token;
  if (req.headers) {
    jwt.verify(refresh_token, "this is refresh token", function(err, payload) {
      if (err) {
        res.status(403).json({
          "error": "Refresh token is expired"
        });
      } else {
        let userId = payload.id;
        let refreshTokenCreatedAt = payload.created_at;
        console.log(`refresh token ${userId}`)
        let jwtToken = req.headers["authorization"];
        if (jwtToken) {
          let payloadAccessToken = jwt.decode(jwtToken, {complete: true}).payload;
          
          if (payloadAccessToken.id == userId && refreshTokenCreatedAt == payloadAccessToken.created_at) {
            // find
            User.findById(userId)
              .then((user) => {
                var hash_token = randtoken.generate(16);
                Token.findOneAndUpdate({user_id: user.id}, { $set: {hash_token: hash_token, user_id: user.id}}, {upsert: true, new: true}, function(err, token) {
                  if (err) {
                    res.status(401).json({
                      "error": e
                    });
                  } else {
                    let created_at = Date.now();
                    res.json({
                      "access_token": user.generateJWTToken(created_at, hash_token),
                      "refresh_token": user.generateJWTRefreshToken(created_at)
                    });
                  }
                });                
              }, (e) => {
                res.status(403).json({
                  "error": "Refresh token fail"
                });
              });
          } else {
            res.status(403).json({
              "error": "Refresh token is invalid"
            });
          }
        } else {
          res.status(403).json({
            "error": "Refresh token is expired"
          });
        }
        
      }
    });
  }
};

const destroy = (req, res) => {
  var hash_token = req.hash_token;
  console.log(`destroy token_id ${hash_token}`)
  Token.findOneAndRemove({hash_token: hash_token}, function (err) {
    console.log(`destroy ${err}`)
    if (err) {
      res.status(403).json({
        "error": "Logout fail",
        err: err
      });
    } else {
      res.status(200).json();
    }
  });
};

export default {
  create,
  destroy,
  refreshToken
};