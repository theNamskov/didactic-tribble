import apiResponses from '../utils/responses'

import Role from '../models/role'

export const create = async (req, res) => {
  try {
    // Keep a consistent form with role titles being capitalised.
    const title =
      req.body.title.charAt(0).toUpperCase() +
      req.body.title.slice(1).toLowerCase()
    const titleExists = await Role.findOne({title})
    if (titleExists)
      return apiResponses.errorResponseWithMsg(res, 'Role appears to exist')
    req.body.title = title
    const role = new Role(req.body)
    const payload = await role.save()
    return apiResponses.successResponseWithData(res, payload)
  } catch (e) {
    console.log(e)
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export const getOne = async (req, res) => {
  try {
    const id = req.params.id
    const role = await Role.findById(id.toString())
    if (!role)
      return apiResponses.notFoundResponse(res, 'Requested role not found.')
    return apiResponses.successResponseWithData(res, role)
  } catch (e) {
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export const getAll = async (req, res) => {
  try {
    const roles = await Role.find({}).sort('--createdAt')
    return apiResponses.successResponseWithData(res, roles)
  } catch (e) {
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export const updateOne = async (req, res) => {
  try {
    const role = await Role.findOneAndUpdate({_id: req.params.id}, req.body, {
      new: true,
    })
    if (!role) return apiResponses.notFoundResponse(res)
    return apiResponses.successResponseWithData(res, role)
  } catch (e) {
    return apiResponses.serverErrorResponseWithData(res, e)
  }
}

export const deleteOne = async (req, res) => {
  try {
    const role = await Role.deleteOne({_id: req.params.id})
    if (!role) return apiResponses.notFoundResponse(res)
    return apiResponses.successResponseWithMsg(
      res,
      `Role with ID ${req.params.id} deleted`,
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
