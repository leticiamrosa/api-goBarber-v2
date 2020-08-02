const errorTypes = {
  DEFAULT: 'DEFAULT',
  APPOINTMENT_DATE_NOT_ALLOW: 'APPOINTMENT_DATE_NOT_ALLOW'
}

const errorCodes = {
  appointment_date_not_allow: errorTypes.APPOINTMENT_DATE_NOT_ALLOW
}

const errorMessages = {
  [errorTypes.DEFAULT]: 'error default',
  [errorTypes.APPOINTMENT_DATE_NOT_ALLOW]: 'This appointment is already booked'
}

export { errorTypes, errorCodes, errorMessages }
