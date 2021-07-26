import express from 'express'

import passport from '../config/auth'

import employeeProjectControllers from '../controllers/employeeProject'

const router = express.Router()
router.use(passport.authenticate('jwt', {session: false}))

router.post('/', employeeProjectControllers.create)

router.get('/:id', employeeProjectControllers.getOne)

router.delete('/:id', employeeProjectControllers.deleteOne)

export default router
