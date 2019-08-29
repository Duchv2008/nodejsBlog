import User from "models/user";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const create = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({username: username})
    .then((user) => {
      if (user.comparePassword(password)) {
        let created_at = Date.now();
        res.json({
          "access_token": user.generateJWTToken(created_at),
          "refresh_token": user.generateJWTRefreshToken(created_at)
        });
      } else {
        res.status(401).json({
          "error": "Login faile"
        });
      }
    }, (e) => {
      res.status(401).json({
        "error": "Login faile"
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
                let created_at = Date.now();
                res.json({
                  "access_token": user.generateJWTToken(created_at),
                  "refresh_token": user.generateJWTRefreshToken(created_at)
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
  res.json(req.current_user);
};

export default {
  create,
  destroy,
  refreshToken
};