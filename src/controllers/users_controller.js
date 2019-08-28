import { User } from "../models/user";

const index = (req, res) => {
  User.find({})
    .select("username")
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(400).send(err.errors);
    });
};

const show = (req, res) => {
  let user_id = req.params.id;
  // console.log(`--------------------------------------------------------`);
  // return User.findOne({_id: user_id}).then((user) => {
  //   res.json(user);
  // }, (e) => {
  //   console.log(`errror: ${e}`)
  //   res.json(e);
  // });
};

export default {
  index
};
