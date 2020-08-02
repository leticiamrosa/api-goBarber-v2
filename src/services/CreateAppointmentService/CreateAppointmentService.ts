import Appointment from '@models/Appointment'
import AppointmentRepository from '@repositories/AppointmentRepository'
import { errorMessages as errorMsg } from './AppointmentsErrorTypes'
import { startOfHour } from '@helpers/dataHelpers'

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentRepository

  constructor (appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository
  }

  public execute ({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = this.appointmentRepository.findByDate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw Error(errorMsg.APPOINTMENT_DATE_NOT_ALLOW)
    }

    const appointment = this.appointmentRepository.create({
      provider,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService
