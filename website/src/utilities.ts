interface HasName {
  name: string
}

export const compareByName = (a: HasName, b: HasName) => {
  if (a.name > b.name) {
    return 1
  }

  if (a.name < b.name) {
    return -1
  }

  return 0
}

export const isNumber = (x: any): x is number => {
  const isANumber = typeof x === "number"
  return isANumber
}

export const isString = (x: any): x is string => {
  const isAString = typeof x === "string"
  return isAString
}

/** Parse a string in the format "YYYY-MM-DDTHH:mm:ss" into a data with the local timezone. */
export const parseAsLocalDateTime = (dateString: string): Date => {
  const numbers = dateString.split(/\D/)
  const dateTime = new Date(
    parseInt(numbers[0], 10),
    parseInt(numbers[1], 10) - 1,
    parseInt(numbers[2], 10),
    parseInt(numbers[3], 10),
    parseInt(numbers[4], 10),
    parseInt(numbers[5], 10))

  return dateTime
}