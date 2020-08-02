import { Router } from 'express'
import Appointment from '@models/Appointment'
import { errorMessages as errorMsg } from './AppointmentsErrorTypes'
import AppointmentRepository from '@repositories/AppointmentRepository'
import { startOfHour, parseISO, isEqual } from '@helpers/dataHelpers'

const AppointmentsRouter = Router()
const appointmentRepository = new AppointmentRepository()

AppointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body

  const parsedDate = startOfHour(parseISO(date))
  const findAppointmentInSameDate = appointmentRepository.findByDate(parsedDate)

  if (findAppointmentInSameDate) {
    return res.status(401)
      .json({
        error: 'appointment_date_not_allow',
        message: errorMsg.APPOINTMENT_DATE_NOT_ALLOW
      })
  }

  const appointment = appointmentRepository.create(provider, parsedDate)

  return res.json(appointment)
})

export default AppointmentsRouter
