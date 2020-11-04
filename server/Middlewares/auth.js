const User = require("../Models/userModel");

let auth = (req, res, next) => {
  let token = req.cookies.auth;

  User.findByToken(token, (err, user) => {
    if (err) return res.status(200).json({ isAuth: false, err });
    if (!user)
      return res.status(200).json({
        isAuth: false,
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
