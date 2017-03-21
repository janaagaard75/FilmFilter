// TODO: Create utility classes with static methods.
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