import { Router } from 'express'
import Appointment from '@models/Appointment'
import { errorMessages as errorMsg } from './AppointmentsErrorTypes'

import { startOfHour, parseISO, isEqual } from '@helpers/dataHelpers'

const AppointmentsRouter = Router()

const appointments: Appointment[] = []

AppointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body

  const parsedDate = startOfHour(parseISO(date))
  const findAppointmentInSameDate = appointments.find((appointment) => isEqual(parsedDate, appointment.date))

  if (findAppointmentInSameDate) {
    return res.status(401)
      .json({
        error: 'appointment_date_not_allow',
        message: errorMsg.APPOINTMENT_DATE_NOT_ALLOW
      })
  }

  const appointment: Appointment = new Appointment(provider, parsedDate)

  appointments.push(appointment)

  return res.json(appointment)
})

export default AppointmentsRouter
