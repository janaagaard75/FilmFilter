// TODO: Create utility classes with static methods.

interface HasName {
  name: string
}

type compareResult = -1 | 0 | 1

export const compareByName = (a: HasName, b: HasName): compareResult => {
  if (a.name > b.name) {
    return 1
  }

  if (a.name < b.name) {
    return -1
  }

  return 0
}

export const log = (message: string) => {
  if (inDevelopmentMode()) {
    // tslint:disable-next-line:no-console
    console.info(message)
  }
}

export const inDevelopmentMode = () => {
  const inDevMode = (process.env.NODE_ENV === "development")
  return inDevMode
}

/** Returns an array of integers with the values from `min` to `max`, both inclusive. */
export const integerArray = (min: number, max: number): Array<number> => {
  const length = max - min + 1
  const array = [...Array(length).keys()].map(i => i + min)
  return array
}

export const isNumber = (x: any): x is number => {
  const isANumber = typeof x === "number"
  return isANumber
}

export const isString = (x: any): x is string => {
  const isAString = typeof x === "string"
  return isAString
}

export const pad = (integer: number, minimumSize: number) => {
  let padded = integer + ""
  while (padded.length < minimumSize) {
    padded = "0" + padded
  }

  return padded
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

export const rangeArray = (length: number): Array<number> => {
  // tslint:disable-next-line:no-unused-variable
  const range = new Array(length).fill(undefined).map((value, index) => index)
  return range
}

export const splitIntoChunks = <T>(a: Array<T>, chunkSize: number): Array<Array<T>> => {
  const chunks = rangeArray(Math.ceil(a.length / chunkSize))
    // tslint:disable-next-line:no-unused-variable
    .map((value, index) => a.slice(index * chunkSize, index * chunkSize + chunkSize))
  return chunks
}