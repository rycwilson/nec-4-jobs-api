import mongoose from 'mongoose'

const jobAttributes = {
  company: {
    type: String,
    required: [true, 'Company is required'],
    maxlength: 50
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    maxlength: 100
  },
  status: {
    type: String,
    enum: ['interview', 'declined', 'pending'],
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  }
}
const options = { timestamps: true };
const jobSchema = new mongoose.Schema(jobAttributes, options)

export default mongoose.model('Job', jobSchema)
