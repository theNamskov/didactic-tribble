import express from 'express'

import employeeRoleControllers from '../controllers/employeeRole'

const router = express.Router()

router.get('/', employeeRoleControllers.getAll)

router.get('/:id', employeeRoleControllers.getOne)

router.patch('/:id', employeeRoleControllers.getOne)

export default router
