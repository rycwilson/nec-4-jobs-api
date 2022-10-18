import { ApiError } from '../errors/index.js'
import { StatusCodes } from 'http-status-codes'

const errorHandler = (err, req, res, next) => {
  return err instanceof ApiError ?
    res.status(err.statusCode).json({ msg: err.message }) :
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

export default errorHandler