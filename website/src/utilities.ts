export const isNumber = (x: any): x is number => {
  const isANumber = typeof x === "number"
  return isANumber
}

export const isString = (x: any): x is string => {
  const isAString = typeof x === "string"
  return isAString
}