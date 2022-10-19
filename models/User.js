import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userAttributes = {
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: 50,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    trim: true
  }
}
const options = { timestamps: true };
const userSchema = new mongoose.Schema(userAttributes, options)

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

export default mongoose.model('User', userSchema)