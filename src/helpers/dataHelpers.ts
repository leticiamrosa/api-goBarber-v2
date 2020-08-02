import { parseISO as dateFnsParseIso, startOfHour as dateFnsStartOfHour, isEqual as dateFnsIsEqual } from 'date-fns'

export const parseISO = (value?: string): Date => {
  if (!value) {
    return null
  }

  return dateFnsParseIso(value)
}

export const startOfHour = (value?: Date): Date => {
  if (!value) {
    return null
  }

  return dateFnsStartOfHour(value)
}

export const isEqual = (dateLeft: Date, dateRight: Date): Boolean => {
  if (!dateLeft || !dateRight) {
    return null
  }

  return dateFnsIsEqual(dateLeft, dateRight)
}
