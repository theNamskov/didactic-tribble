import express from 'express'

import passport from '../config/auth'

import roleControllers from '../controllers/role'

const router = express.Router()
router.use(passport.authenticate('jwt', {session: false}))

router.post('/', roleControllers.create)

router.get('/:id', roleControllers.getOne)

router.get('/', roleControllers.getAll)

router.patch('/:id', roleControllers.updateOne)

router.delete('/:id', roleControllers.deleteOne)

export default router
