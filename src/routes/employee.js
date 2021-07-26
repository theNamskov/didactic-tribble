import express from 'express'

import passport from '../config/auth'
import employeeControllers from '../controllers/employee'

const router = express.Router()
router.post('/auth/login', employeeControllers.login)
router.use(passport.authenticate('jwt', {session: false}))

router.post('/', employeeControllers.create)

router.get('/:id', employeeControllers.getOne)

router.get('/', employeeControllers.getAll)

router.patch('/:id', employeeControllers.updateOne)

router.delete('/:id', employeeControllers.deleteOne)

export default router
