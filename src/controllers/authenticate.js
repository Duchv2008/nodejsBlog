import User from "models/user";
import jwt from "jsonwebtoken";

exports.isAuthenticated = function (req, res, next) {
  console.log(req.headers["authorization"]);
  if (req.headers) {
    let jwtToken = req.headers["authorization"];
    if (jwtToken) {
      jwt.verify(jwtToken, "this is private key", function (err, payload) {
        if (err) {
          res.status(401).json({
            "error": "Not authentication"
          });
        } else {
          let userId = payload.id;
          // find
          User.findById(userId)
            .then((user) => {
              req.current_user = user;
              next();
            }, (e) => {
              res.status(401).json({
                "error": "Not authentication"
              });
            });
        }
      });
    } else {
      res.status(401).json({
        "error": "Not authentication"
      });
    }
  } else {
    res.status(401).json({
      "error": "Not authentication"
    });
  }
};
