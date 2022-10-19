import User from '../models/user.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
  console.log(req.body)
  // mongoose will validate
  // const { name, email, password } = req.body
  // if (!name || !email || !password) {
  //   throw new BadRequestError('Name, email, and password are required')
  // }

  const user = await User.create(req.body)
  const token = jwt.sign(
    { userId: user._id, name: user.name }, 'jwtSecret', { expiresIn: '30d' }
  )
  res.status(StatusCodes.CREATED).json({ user: { name: user.name}, token })
}

const login = async (req, res) => {
  res.send('login user')
}

export { register, login }