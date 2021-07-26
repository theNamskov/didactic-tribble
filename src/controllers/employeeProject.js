import apiResponses from '../utils/responses'

import EmployeeProject from '../models/employeeProject'

export const create = async (req, res) => {
  try {
    const employeeProject = new EmployeeProject(req.body)
    const payload = await employeeProject.save()

    return apiResponses.successResponseWithData(res, payload)
  } catch (e) {
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export const getOne = async (req, res) => {
  try {
    const employeeProjects = await EmployeeProject.find({
      employeeId: req.params.id,
    }).populate('projectId')

    return apiResponses.successResponseWithData(res, employeeProjects)
  } catch (e) {
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export const deleteOne = async (req, res) => {
  try {
    await EmployeeProject.findByIdAndRemove(req.params.id)
    return apiResponses.successResponseWithMsg(
      res,
      `Employee Project relationship ${req.params.id} deleted.`,
    )
  } catch (e) {
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export default {
  create,
  getOne,
  deleteOne,
}
