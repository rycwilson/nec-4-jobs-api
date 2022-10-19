import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import 'express-async-errors'
import authRouter from './routes/auth.js'
import jobsRouter from './routes/jobs.js'
import notFound from './middleware/not-found.js'
import errorHandler from './middleware/error-handler.js'

const appName = 'nec-jobs-api'
const app = express()

dotenv.config()

app
  .use(express.static('./public'))
  .use(express.json())
  .use('/api/v1/auth', authRouter)
  .use('/api/v1/jobs', jobsRouter)
  .use(notFound)
  .use(errorHandler)

connectDb(`${process.env.MONGO_URI}/${appName}`)
  .then(start)
  .catch(err => console.log(`Error connecting to database: ${err.message}`))

function start() {
  const port = process.env.PORT || 8000
  app.listen(port, () => console.log(`${appName} server is listening on port ${port}...`))
}