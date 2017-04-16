export class Dates {
  /** Parse a string in the format "YYYY-MM-DDTHH:mm:ss" into a data with the local timezone. */
  public static parseAsLocalDateTime(dateString: string): Date {
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
}