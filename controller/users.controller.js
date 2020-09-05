var jwt = require("jsonwebtoken");
var md5 = require('md5');
var User = require('../models/user.model');

module.exports.login = async function (req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({email});
    if (!user) {
      res.status(401);
      res.json({ msg: 'Email does not exist!' });
      return;
    }
    const hashPassword =md5(password);
    if (user.password !== hashPassword) {
      res.status(401);
      res.json({ msg: "Password wrong" });
      return;
    } else {
      const token = jwt.sign({ _id: user._id }, "shhh");
      res.header("auth-token", token);
      const client = {
        email: email,
        password: password,
        token: token
      };
      console.log(`${client.token} zz`);
      res.json(client);
    }
  } catch (error) {
    next(error);
  }
};
module.exports.z = function (req, res, next) {
  res.json(acc);
};
module.exports.check = async function (req, res, next) {
  const token = req.body.token;
  console.log(`${(req.body.token)} token`);

  if (!token) {
    return;
  } else {
    const verified = jwt.verify(token, "shhh");
    console.log(verified);
    const user = await User.findOne({_id: verified._id});
    if (user) {
      res.json(user);
      console.log(`${user} mn`);
      console.log(true);
    } else {
      console.log(false)
    }
  }
};
module.exports.create = async function (req, res, next) {
  const email = req.body.email;
  const user = await User.findOne({email});
  if (user) {
    res.status(400);
    res.json({ msg: "Email already exists" });
  } else {
    req.body.password = md5(req.body.password);

    const newUser = await new User(req.body);
    newUser.save();
    res.json(req.body);
  }
}