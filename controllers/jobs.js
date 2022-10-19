import Job from '../models/job.js'
import ApiError from '../errors/custom-error.js'

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({})
  res.status(200).json({ jobs })
}

const createJob = async (req, res) => {
  res.json(req.user)
  // const job = await job.create(req.body)
  // res.status(201).json({ job })
}

const getJob = async (req, res) => {
  const { id: jobId } = req.params
  const job = await Job.findOne({ _id: jobId })
  if (!job) {
    // return res.status(404).json({ "error": `No job with id ${jobId}` })
    throw new ApiError(`No job with id: ${jobId}`, 404)
  } else {
    res.status(200).json({ job })
  }
}

const updateJob = async (req, res) => {
  const { id: jobId } = req.params

  // add option overwrite: true if a PUT with missing attributes should remove or reset those attributes
  const job = await job.findOneAndUpdate(
    { _id: jobId }, req.body, { new: true, runValidators: true }
  )
  if (!job) {
    throw new ApiError(`No job with id: ${jobId}`, 404)
  }
  res.status(200).json({ job })
}

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params
  const job = await job.findOneAndDelete({ _id: jobId })
  if (!job) {
    return next(new ApiError(`No job with id: ${jobId}`, 404))
  }
  res.status(200).json({ status: 'success' })
}

export { getAllJobs, createJob, getJob, updateJob, deleteJob }