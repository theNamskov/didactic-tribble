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
    let employeeProjects = await EmployeeProject.find({
      employeeId: req.params.id,
    }).populate('projectId')

    employeeProjects = employeeProjects.map(data => data.toObject())
    const projectsRef = employeeProjects.map(({projectId: project}) => {
      return EmployeeProject.find({projectId: project._id})
        .select('employeeId')
        .populate('employeeId', {password: 0})
    })

    let contribs = await Promise.all(projectsRef)
    contribs.forEach((arr, i) => {
      employeeProjects[i].contributors = arr
    })

    return apiResponses.successResponseWithData(res, employeeProjects)
  } catch (e) {
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export const deleteOne = async (req, res) => {
  try {
    await EmployeeProject.findByIdAndRemove(req.params.id.toString())
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
