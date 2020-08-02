import Appointment from '@models/Appointment'
import { startOfHour, parseISO, isEqual } from '@helpers/dataHelpers'

class AppointmentRepository {
  private appointments: Appointment[];

  constructor () {
    this.appointments = []
  }

  public create (provider:string, date: Date): Appointment {
    const appointment = new Appointment(provider, date)
    this.appointments.push(appointment)

    return appointment
  }

  public findByDate (date: Date): Appointment | null {
    const findAppointmentInSameDate = this.appointments.find((appointment) => isEqual(date, appointment.date))
    return findAppointmentInSameDate
  }
}

export default AppointmentRepository
