import ApiError from './custom-error.js'
import { StatusCodes } from 'http-status-codes'

class UnauthenticatedError extends ApiError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

export default UnauthenticatedError
