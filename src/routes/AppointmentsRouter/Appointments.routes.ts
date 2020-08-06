import { Router } from 'express'
import Appointment from '@models/Appointment'
import AppointmentRepository from '@repositories/AppointmentRepository'
import { getCustomRepository } from 'typeorm'
import CreateAppointmentService from '@services/CreateAppointmentService/CreateAppointmentService'
import { parseISO } from '@helpers/dataHelpers'

const AppointmentsRouter = Router()

AppointmentsRouter.get('/', async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository)
  const appointments = await appointmentRepository.find()
  return res.status(200).json(appointments)
})

AppointmentsRouter.post('/', async (req, res) => {
  try {
    const { provider_id, date } = req.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()

    const appointment = await createAppointment.execute({ date: parsedDate, provider_id })

    return res.json(appointment)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
})

export default AppointmentsRouter
