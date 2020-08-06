import Appointment from '@models/Appointment'
import AppointmentRepository from '@repositories/AppointmentRepository'
import { getCustomRepository } from 'typeorm'
import { errorMessages as errorMsg } from './AppointmentsErrorTypes'
import { startOfHour } from '@helpers/dataHelpers'

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute ({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository
    )
    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentRepository.findByDate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw Error(errorMsg.APPOINTMENT_DATE_NOT_ALLOW)
    }

    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmentDate
    })

    await appointmentRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
