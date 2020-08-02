import { Router, response } from 'express'
import { id } from '@utils/uuid'
import Appointments from 'src/routes/AppointmentsRouter/Appointments'
import { errorMessages as errorMsg } from './AppointmentsErrorTypes'

import { startOfHour, parseISO, isEqual } from '@helpers/dataHelpers'

const AppointmentsRouter = Router()

const appointments: Appointments[] = []

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

  const appointment: Appointments = {
    id,
    provider,
    date: parsedDate
  }

  appointments.push(appointment)

  return res.json(appointment)
})

export default AppointmentsRouter
