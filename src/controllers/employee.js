import 'dotenv/config'
import bcrypt from 'bcryptjs'

import apiResponses from '../utils/responses'

import Employee from '../models/employee'
import EmployeeRole from '../models/employeeRole'
import EmployeeProject from '../models/employeeProject'

import {signToken} from '../utils/helpers'

export const create = async (req, res) => {
  try {
    const email = req.body.email
    const {role, projects, ...data} = req.body
    const employeeExists = await Employee.findOne({email})
    if (employeeExists)
      return apiResponses.errorResponseWithMsg(res, 'Email already exists')
    const salt = await bcrypt.genSalt(12)
    const defaultPass = await bcrypt.hash('password123', salt)
    data.password = defaultPass
    const employee = new Employee(data)
    const payload = await employee.save()
    const employeeRole = new EmployeeRole({
      employeeId: employee.id,
      roleId: role,
    })
    await employeeRole.save()

    if (projects) {
      const employeeProjects = projects.map(projectId => {
        const employeeProject = new EmployeeProject({
          employeeId: employee.id,
          projectId,
        })

        return employeeProject.save()
      })

      await Promise.all(employeeProjects)
    }
    return apiResponses.successResponseWithData(res, {
      employee: payload,
      role,
      projects,
    })
  } catch (e) {
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export const login = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await Employee.findOne({email})
    if (!user)
      return apiResponses.notFoundResponse(
        res,
        'Invalid email or password. Check email or password.',
      )
    const valid = await bcrypt.compare(password, user.password)
    if (!valid)
      return apiResponses.errorResponseWithMsg(
        res,
        'Invalid user credentials. Check email or password.',
      )
    return apiResponses.successResponseWithData(
      res,
      signToken({id: user.id}, process.env.AUTH_SECRET_DEF, {expiresIn: '5d'}),
    )
  } catch (e) {
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export const getOne = async (req, res) => {
  try {
    const id = req.params.id
    const employee = await Employee.findById(id.toString()).select('-password')
    if (!employee || !employee.isActive)
      return apiResponses.notFoundResponse(res, 'Requested employee not found.')
    return apiResponses.successResponseWithData(res, employee)
  } catch (e) {
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export const getAll = async (req, res) => {
  try {
    const employees = await Employee.find({isActive: true})
      .sort('--createdAt')
      .select('-password')
    return apiResponses.successResponseWithData(res, employees)
  } catch (e) {
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export const updateOne = async (req, res) => {
  const {password, isActive, ...updatePayload} = req.body
  password, isActive
  try {
    const employee = await Employee.findOneAndUpdate(
      {_id: req.params.id, isActive: true},
      updatePayload,
      {
        new: true,
      },
    ).select('-password')
    if (!employee)
      return apiResponses.notFoundResponse(res, 'Requested employee not found.')
    return apiResponses.successResponseWithData(res, employee)
  } catch (e) {
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export const deleteOne = async (req = {}, res = {}) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      {_id: req.params.id, isActive: true},
      {$set: {isActive: false}},
    )
    if (!employee) return apiResponses.notFoundResponse(res)
    await EmployeeRole.deleteOne({employeeId: req.params.id})
    await EmployeeProject.deleteMany({employeeId: req.params.id})
    return apiResponses.successResponseWithMsg(
      res,
      `Employee with ID ${req.params.id} deleted`,
    )
  } catch (e) {
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export default {
  login,
  create,
  getOne,
  getAll,
  updateOne,
  deleteOne,
}
