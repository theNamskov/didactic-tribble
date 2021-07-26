import express from 'express'

import employeeControllers from '../controllers/employee'

const router = express.Router()

router.post('/', employeeControllers.create)

router.get('/:id', employeeControllers.getOne)

router.get('/', employeeControllers.getAll)

router.patch('/:id', employeeControllers.updateOne)

router.delete('/:id', employeeControllers.deleteOne)

export default router
