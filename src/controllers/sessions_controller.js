import User from 'models/user';

const create = (req, res) => {
  let { username, password } = req.body;
  if (!(username && password)) {
    return res.render('login');
  }
  User.findOne({ username: username }, function(err, user) {
    if (err) {
      return res.render('error');
    }
    if (user.comparePassword(password)) {
      return res.send('ok');
    } else {
      return res.render('error');
    }
  });
};
export default {
  create,
};
