const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var postSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    imageUrls: [String],
    pdfUrls: [String],
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Post", postSchema);
