import 'dotenv/config'
import 'regenerator-runtime/runtime'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import xss from 'xss-clean'
import hpp from 'hpp'
import path from 'path'

import database from './config/db'

import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

import {specOptions, customOptions} from './config/docs/swagger-options'

import {notFoundResponse} from './utils/responses'

import employeesRouter from './routes/employee'
import projectsRouter from './routes/project'
import rolesRouter from './routes/role'
import employeesAndProjectsRouter from './routes/employeeProject'
import employeesAndRolesRouter from './routes/employeeRole'

import passport from './config/auth'

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.raw())
app.use(express.text())
app.use(morgan('dev'))
app.use(cors())
app.use(mongoSanitize()) //Use for security to prevent NoSql injections
app.use(helmet()) //Adds extra headers to protect the routes
app.use(xss()) //To prevent a harmful script being sent with the POST request
app.use(hpp()) //To prevent HTTP Parameter Pollution.
app.use(express.static(path.join(__dirname, 'config/docs/assets')))
app.use(passport.initialize())
const router = express.Router()

router.use('/employees', employeesRouter)
router.use('/projects', projectsRouter)
router.use('/roles', rolesRouter)
router.use('/employee-role', employeesAndRolesRouter)
router.use('/employee-project', employeesAndProjectsRouter)

app.use('/api/v1', router)

// Default Route
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Assessment API is live',
    author: 'theNamskov',
    github: 'https://github.com/theNamskov',
    linkedin: 'https://linkedin.com/in/thenamskov',
  })
})

const docs = swaggerJSDoc(specOptions)
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs, customOptions))

app.use((req, res) => {
  return notFoundResponse(res, 'Requested resource not found.')
})

const port = process.env.PORT
app.listen(port, async () => {
  try {
    await database()
    console.log(`Service listening at ${process.env.APP_BASE_URL}:${port}`)
  } catch (e) {
    console.log('DB CONNECTION ERROR:', e.message)
    console.log(`Service listening at ${process.env.APP_BASE_URL}:${port}`)
  }
})
