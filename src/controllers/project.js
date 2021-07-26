import apiResponses from '../utils/responses'

import Project from '../models/project'

export const create = async (req, res) => {
  try {
    // Keep a consistent form with project names being capitalised.
    const name =
      req.body.name.charAt(0).toUpperCase() +
      req.body.name.slice(1).toLowerCase()
    const nameExists = await Project.findOne({name})
    if (nameExists)
      return apiResponses.errorResponseWithMsg(
        res,
        'Project title appears to exist',
      )
    req.body.name = name
    const project = new Project(req.body)
    const payload = await project.save()
    return apiResponses.successResponseWithData(res, payload)
  } catch (e) {
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export const getOne = async (req, res) => {
  try {
    const id = req.params.id
    const project = await Project.findById(id.toString())
    if (!project)
      return apiResponses.notFoundResponse(res, 'Requested project not found.')
    return apiResponses.successResponseWithData(res, project)
  } catch (e) {
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export const getAll = async (req, res) => {
  try {
    const projects = await Project.find({}).sort('--createdAt')
    return apiResponses.successResponseWithData(res, projects)
  } catch (e) {
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export const updateOne = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      {_id: req.params.id},
      req.body,
      {
        new: true,
      },
    )
    if (!project) return apiResponses.notFoundResponse(res)
    return apiResponses.successResponseWithData(res, project)
  } catch (e) {
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export const deleteOne = async (req, res) => {
  try {
    const project = await Project.delete({_id: req.params.id})
    if (!project) return apiResponses.notFoundResponse(res)
    return apiResponses.successResponseWithMsg(
      res,
      `Project with ID ${req.params.id} deleted`,
    )
  } catch (e) {
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export default {
  create,
  getOne,
  getAll,
  updateOne,
  deleteOne,
}
