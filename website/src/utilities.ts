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

