import { Router } from 'express'
import Appointment from '@models/Appointment'
import AppointmentRepository from '@repositories/AppointmentRepository'
import CreateAppointmentService from '@services/CreateAppointmentService/CreateAppointmentService'
import { parseISO } from '@helpers/dataHelpers'

const AppointmentsRouter = Router()
const appointmentRepository = new AppointmentRepository()

AppointmentsRouter.get('/', (req, res) => {
  const appointments = appointmentRepository.all()
  return res.status(200).json(appointments)
})

AppointmentsRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService(appointmentRepository)

    const appointment = createAppointment.execute({ date: parsedDate, provider })

    return res.json(appointment)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
})

export default AppointmentsRouter
