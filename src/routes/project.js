import express from 'express'

import passport from '../config/auth'

import projectControllers from '../controllers/project'

const router = express.Router()
router.use(passport.authenticate('jwt', {session: false}))

router.post('/', projectControllers.create)

router.get('/:id', projectControllers.getOne)

router.get('/', projectControllers.getAll)

router.patch('/:id', projectControllers.updateOne)

router.delete('/:id', projectControllers.deleteOne)

export default router
