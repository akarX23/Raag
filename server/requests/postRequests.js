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

  // GET Requests
  app.get("/api/posts", (req, res) => {
    Post.find({})
      .sort({ updatedAt: "desc" })
      .exec((err, posts) => {
        if (err)
          return res.status(200).json({
            found: false,
            err,
          });
        return res.status(200).json({
          found: true,
          posts,
        });
      });
  });

  // DELETE Requests
  app.get("/api/deletePost", auth, (req, res) => {
    let id = req.query.id;
    try {
      Post.findByIdAndDelete(id, (err, post) => {
        return res.status(200).json({
          success: true,
          deleted: true,
        });
      });
    } catch (err) {
      return res.status(200).json({
        success: false,
        err,
      });
    }
  });
};
