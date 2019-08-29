import User from "models/user";
import mongoose from "mongoose";

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
  User.findOne({_id: user_id}).then((user) => {
    res.json(user);
  }, (e) => {
    res.json(e);
  });
};

const create = (req, res) => {
  let user = new User({
    username: req.body.username,
    password_digest: req.body.password
  });

  user.save()
    .then( (response) => {
      res.json(response);
    }).catch(e => {
      res.json(e);
    });
};

const update = (req, res) => {
  let user_id = req.params.id;
  if(mongoose.Types.ObjectId.isValid(user_id)) {
    User.findByIdAndUpdate(user_id, { username: req.body.username }, { new: true })
      .then((docs)=>{
        res.json(docs);
      }).catch((err)=>{
        res.json(err);
      });
  } else {
    res.json("id not found");
  }
};

const destroy = (req, res) => {
  let user_id = req.params.id;
  if(mongoose.Types.ObjectId.isValid(user_id)) {
    User.findByIdAndRemove(user_id)
      .then((docs)=> {
        res.json(docs);
      }).catch((err)=> {
        res.json(err);
      });
  } else {
    res.json("id not found");
  }
};

export default {
  index,
  show,
  create,
  update,
  destroy
};
