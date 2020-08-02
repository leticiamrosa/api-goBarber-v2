import { Router } from 'express'
import AppointmentsRouter from './AppointmentsRouter/Appointments.routes'

const routes = Router()

routes.use('/appointments', AppointmentsRouter)

export default routes
