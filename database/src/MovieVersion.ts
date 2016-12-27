enum Dimensions {
  TwoD,
  ThreeD
}

enum Language {
  Danish,
  Original
}

export class MovieVersion {
  public dimensions: Dimensions
  public imax: boolean
  public language: Language
  public specialShowing: boolean
}