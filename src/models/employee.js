import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema

const employeeSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required.'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required.'],
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {timestamps: true},
)

employeeSchema.plugin(mongoosePaginate)

const Employee = mongoose.model('Employee', employeeSchema, 'Employee')

export default Employee
