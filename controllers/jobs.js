const getAllJobs = async (req, res) => {
  res.send('get all jobs')
}

const createJob = async (req, res) => {
  res.send('create job')
}

const getJob = async (req, res) => {
  res.send('get job')
}

const updateJob = async (req, res) => {
  res.send('update job')
}

const deleteJob = async (req, res) => {
  res.send('delete job')
}

export { getAllJobs, createJob, getJob, updateJob, deleteJob }