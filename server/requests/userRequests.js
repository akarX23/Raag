const User = require("../Models/userModel");
const { auth } = require("../Middlewares/auth");

module.exports = function (app) {
  //POST Requests

  app.post("/api/addUser", auth, (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err || user)
        return res.status(200).json({
          success: false,
          err,
        });
      else {
        const user = new User(req.body);
        user.save((err, user) => {
          if (err)
            return res.status(200).json({
              success: false,
              err,
            });
          return res.status(200).json({
            success: true,
          });
        });
      }
    });
  });

  app.post("/api/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err || !user)
        return res.status(200).send({ isAuth: false, err, success: false });
      user.comparePasswords(req.body.password, (err, isMatch) => {
        if (err)
          return res.status(200).send({ isAuth: false, err, success: false });
        if (!isMatch)
          return res.status(200).json({
            isAuth: false,
            mismatch: true,
            success: false,
          });
        user.generateAuthToken((err, user) => {
          if (err || !user)
            return res.status(400).send({ isAuth: false, err, success: false });
          res.cookie("auth", user.token);
          return res.status(200).json({
            name: user.name,
            _id: user._id,
            email: user.email,
            isAuth: true,
            success: true,
          });
        });
      });
    });
  });

  // GET REQUESTS
  app.get("/api/auth", auth, (req, res) => {
    res.status(200).json({
      _id: req.user._id,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
    });
  });

  app.get("/api/logout", auth, (req, res) => {
    req.user.deleteToken((err) => {
      if (err)
        res.status(200).json({
          success: false,
        });
      res.cookie("auth", null);
      res.status(200).json({ isAuth: false });
    });
  });
};
