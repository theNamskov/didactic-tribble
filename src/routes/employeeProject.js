import express from 'express'

import employeeProjectControllers from '../controllers/employeeProject'

const router = express.Router()

router.post('/', employeeProjectControllers.create)

router.get('/:id', employeeProjectControllers.getOne)

router.delete('/:id', employeeProjectControllers.deleteOne)

export default router
