import express from 'express'

import passport from '../config/auth'

import employeeRoleControllers from '../controllers/employeeRole'

const router = express.Router()
router.use(passport.authenticate('jwt', {session: false}))

router.get('/', employeeRoleControllers.getAll)

router.get('/:id', employeeRoleControllers.getOne)

router.patch('/:id', employeeRoleControllers.getOne)

export default router
