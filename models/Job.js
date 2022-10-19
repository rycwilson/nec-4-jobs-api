import mongoose from 'mongoose'

const jobAttributes = {
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: 50,
    trim: true
  },
}
const options = { timestamps: true };
const jobSchema = new mongoose.Schema(jobAttributes, options)
const Job = mongoose.model('Job', jobSchema)

export default Job