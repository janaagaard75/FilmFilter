type compareResult = -1 | 0 | 1

interface HasName {
  name: string
}

export class Comparer {
  // Using fat arrow syntax to allow usage without parameters.
  public static compareByName = (a: HasName, b: HasName): compareResult => {
    if (a.name > b.name) {
      return 1
    }

    if (a.name < b.name) {
      return -1
    }

    return 0
  }

  public static isNumber(x: any): x is number {
    const isANumber = typeof x === "number"
    return isANumber
  }

  public static isString = (x: any): x is string => {
    const isAString = typeof x === "string"
    return isAString
  }
}