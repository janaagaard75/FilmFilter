import { Comparable } from "./Comparable"

export class Arrays {
  public static hasSomeInCommon<T extends Comparable<T>>(arrayA: Array<T>, arrayB: Array<T>): boolean {
    const atLeastOneElementInCommon = arrayA.some(elementA =>
      arrayB.some(elementB => elementA.equals(elementB))
    )
    return atLeastOneElementInCommon
  }

  /** Returns an array of integers with the values from `min` to `max`, both inclusive. */
  public static rangeArray(min: number, max: number): Array<number> {
    const length = max - min + 1
    const array = [...Array(length).keys()].map(i => i + min)
    return array
  }

  public static splitIntoChunks<T>(a: Array<T>, chunkSize: number): Array<Array<T>> {
    const chunks = Arrays.rangeArray(0, Math.ceil(a.length / chunkSize) - 1)
      .map(n => a.slice(n * chunkSize, n * chunkSize + chunkSize))
    return chunks
  }
}