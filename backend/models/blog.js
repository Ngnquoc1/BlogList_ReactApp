const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [String],
  tags: {
    type: [String],
    default: [],
  },

  type: {
    type: String,
    enum: ["link", "article"],
    default: "link",
  },
  preview: {
    title: String,
    description: String,
    image: String,
    siteName: String,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
