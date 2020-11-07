const Post = require("../Models/postModel");
const { auth } = require("../Middlewares/auth");

module.exports = function (app) {
  //POST Requests
  app.post("/api/addPost", auth, (req, res) => {
    const post = new Post(req.body);
    post.save((err, post) => {
      if (err)
        return res.status(200).json({
          success: false,
          err,
        });
      return res.status(200).json({
        success: true,
        postAdded: true,
      });
    });
  });
};
