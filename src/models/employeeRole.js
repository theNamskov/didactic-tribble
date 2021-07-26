import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema

const employeeRoleSchema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
  },
  {timestamps: true},
)

employeeRoleSchema.plugin(mongoosePaginate)

const EmployeeRole = mongoose.model(
  'EmployeeRole',
  employeeRoleSchema,
  'EmployeeRole',
)

export default EmployeeRole
