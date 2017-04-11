export class Strings {
  public static searchable(value: string): string {
    const lowercased = value.toLocaleLowerCase()
    const normalized = lowercased.normalize("NFD")
    const modifiersRemoved = normalized.replace(/[\u0300-\u036f]/g, "")
    return modifiersRemoved
  }
}