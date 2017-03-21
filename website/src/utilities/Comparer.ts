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
}