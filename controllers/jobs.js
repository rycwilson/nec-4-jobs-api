import { StatusCodes } from 'http-status-codes'
import Job from '../models/job.js'
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../errors/index.js'

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const createJob = async (req, res) => {
  req.body.createdAt = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const getJob = async (req, res) => {
  const { user: { userId }, params: { id: jobId }} = req
  const job = await Job.findOne({ _id: jobId, createdBy: userId }).select('-createdAt -updatedAt') 
  if (!job) throw new NotFoundError(`No job with id: ${jobId}`, 404)
  res.status(StatusCodes.OK).json({ job })
}

const updateJob = async (req, res) => {
  const { user: { userId }, body: { company, position }, params: { id: jobId } } = req
  if (!company || !position) throw new BadRequestError('Missing required fields')

  // add option overwrite: true if a PUT with missing attributes should remove or reset those attributes
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId }, 
    req.body, 
    { new: true, runValidators: true }
  )
  if (!job) throw new NotFoundError(`No job with id: ${jobId}`, 404)
  res.status(200).json({ job })
}

const deleteJob = async (req, res) => {
  const { user: { userId }, params: { id: jobId }} = req
  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId })
  if (!job) throw new ApiError(`No job with id: ${jobId}`, 404)
  res.status(200).send()
}

export { getAllJobs, createJob, getJob, updateJob, deleteJob }