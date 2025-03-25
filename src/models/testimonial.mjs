import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  profile: {
    type: String, // URL of the profile image
    default: '',
  },
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  companyEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

let Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
