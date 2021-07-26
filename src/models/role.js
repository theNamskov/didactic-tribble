import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema

const roleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'A role title is required.'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {timestamps: true},
)

roleSchema.plugin(mongoosePaginate)

const Role = mongoose.model('Role', roleSchema, 'Role')

export default Role
