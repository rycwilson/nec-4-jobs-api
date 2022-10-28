import express from 'express'
import dotenv from 'dotenv'
import 'express-async-errors'

// security packages
import helmet from 'helmet'
import cors from 'cors'
import xss from 'xss-clean'
import rateLimiter from 'express-rate-limit'

import connectDb from './config/db.js'
import authRouter from './routes/auth.js'
import jobsRouter from './routes/jobs.js'
import authenticateUser from './middleware/auth.js'
import notFound from './middleware/not-found.js'
import errorHandler from './middleware/error-handler.js'

const appName = 'nec-jobs-api'
const app = express()

dotenv.config()

app
  .get('/', (req, res) => res.send('jobs api'))   // just a sanity check
  .set('trust proxy', 1)  // (for heroku deploy) https://www.npmjs.com/package/express-rate-limit#user-content-troubleshooting-proxy-issues
  .use(
    rateLimiter({
      windowMs: 15 * 60 * 1000,   // 15 mins
      max: 100,   // limit each IP to 100 requests per windowMs
    }
  ))
  .use(express.json())
  .use(helmet())
  .use(cors())
  .use('/api/v1/auth', authRouter)
  .use('/api/v1/jobs', authenticateUser, jobsRouter)
  .use(notFound)
  .use(errorHandler)

connectDb(`${process.env.MONGO_URI}/${appName}`)
  .then(start)
  .catch(err => console.log(`Error connecting to database: ${err.message}`))

function start() {

  // for heroku deployment, make sure process.env.PORT is specified
  const port = process.env.PORT || 8000
  app.listen(port, () => console.log(`${appName} server is listening on port ${port}...`))
}