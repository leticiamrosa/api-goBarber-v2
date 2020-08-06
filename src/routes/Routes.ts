import { Router } from 'express'
import AppointmentsRouter from './AppointmentsRouter/Appointments.routes'
import UserRouter from './Users/Users.routes'

const routes = Router()

routes.use('/appointments', AppointmentsRouter)
routes.use('/users', UserRouter)

export default routes
