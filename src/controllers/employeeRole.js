import apiResponses from '../utils/responses'

import EmployeeRole from '../models/employeeRole'

export const getOne = async (req, res) => {
  try {
    const employeeRole = await EmployeeRole.findOne({
      employeeId: req.params.id,
    }).populate('roleId')

    if (!employeeRole) return apiResponses.notFoundResponse(res)

    return apiResponses.successResponseWithData(res, employeeRole)
  } catch (e) {
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export const getAll = async (req, res) => {
  try {
    const employeeRoles = await EmployeeRole.find({}).populate('roleId')

    return apiResponses.successResponseWithData(res, employeeRoles)
  } catch (e) {
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export const updateOne = async (req, res) => {
  try {
    const employeeRole = await EmployeeRole.updateOne(
      {employeeId: req.params.id},
      req.body,
      {new: true},
    ).populate('roleId')

    if (!employeeRole) return apiResponses.notFoundResponse(res)

    return apiResponses.successResponseWithData(res, employeeRole)
  } catch (e) {
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export default {
  getOne,
  getAll,
  updateOne,
}
