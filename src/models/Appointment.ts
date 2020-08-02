import { id } from '@utils/uuid'

export class Appointment {
  id: string;
  provider: string;
  date: Date;

  public constructor ({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = id
    this.provider = provider
    this.date = date
  };
}

export default Appointment
