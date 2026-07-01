const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: String,
    url: {
      type: String,
      required: function () {
        return this.type === "link"; // chỉ link mới bắt buộc url
      },
    },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    content: String, // markdown, cho article
    coverUrl: String, // ảnh bìa article (optional)
    comments: [
      {
        text: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now },
      },
    ],

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
  },
  { timestamps: true },
);

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
