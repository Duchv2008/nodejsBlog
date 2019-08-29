import User from "models/user";
import mongoose from "mongoose";

const create = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({username: username})
    .then((user) => {
      if (user.comparePassword(password)) {
        res.json({
          "access_token": user.generateJWTToken(),
          "refresh_token": ""
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

const destroy = (req, res) => {
  res.json(req.current_user);
};

export default {
  create,
  destroy
};