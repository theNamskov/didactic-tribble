import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'A project name is required.'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {timestamps: true},
)

projectSchema.plugin(mongoosePaginate)

const Project = mongoose.model('Project', projectSchema, 'Project')

export default Project
