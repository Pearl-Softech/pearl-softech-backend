import mongoose from "mongoose";

// Define the Blog Schema
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String, // URL for the thumbnail image
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Blog model based on the schema
const Blog = mongoose.model('Blog', blogSchema);

export default Blog