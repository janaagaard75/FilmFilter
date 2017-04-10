export class Numbers {
  public static pad(integer: number, minimumSize: number) {
    let padded = integer + ""
    while (padded.length < minimumSize) {
      padded = "0" + padded
    }

    return padded
  }
}