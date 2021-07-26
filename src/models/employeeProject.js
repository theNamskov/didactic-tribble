import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema

const employeeProjectSchema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
  },
  {timestamps: true},
)

employeeProjectSchema.plugin(mongoosePaginate)

const EmployeeProject = mongoose.model(
  'EmployeeProject',
  employeeProjectSchema,
  'EmployeeProject',
)

export default EmployeeProject
