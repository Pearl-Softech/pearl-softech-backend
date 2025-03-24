import mongoose from "mongoose";

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  deadline: {
    type: Date,
    required: true,
  },

  qualification: {
    type: [String], // Array of strings
    default: [],
  },

  requiredSkills: {
    type: [String], // Array of strings
    default: [],
  },

  tags: {
    type: [String],
    enum: ['Software Development', 'Digital Marketing', 'Web Development'],
    default: [],
  },

  type: {
    type: String,
    enum: ['Full Time', 'Part Time'],
    default: 'Full Time',
  },

  workMode: {
    type: String,
    enum: ['Onsite', 'Remote'],
    default: 'Onsite',
  },

  jobLevel: {
    type: String,
    enum: ['Entry Level', 'Mid Level', 'Senior', 'Intern'],
    default: 'Entry Level',
  },

  salary: {
    type: String,
    default: '',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Career = mongoose.model('Career', careerSchema);

export default Career;
