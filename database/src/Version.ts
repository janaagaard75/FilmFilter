import { VersionFlag } from './ShowingLine'

enum Dimensions {
  ThreeD,
  TwoD
}

enum Language {
  Danish,
  Original
}

export class Version {
  constructor(versionFlags: Array<VersionFlag>) {
    if (versionFlags.filter(flag => flag === '2D' || flag === 'IMAX 2D').length > 0) {
      this.dimensions = Dimensions.TwoD
    }
    else {
      this.dimensions = Dimensions.ThreeD
    }

    this.imax = (versionFlags.filter(flag => flag === 'IMAX 2D' || flag === 'IMAX 3D').length > 0)

    this.language = versionFlags.filter(flag => flag === 'dansk tale')
      ? Language.Danish
      : Language.Original

    this.specialShowing = (versionFlags.filter(flag => flag === 'Særvisning').length > 0)
  }

  public readonly dimensions: Dimensions
  public readonly imax: boolean
  public readonly language: Language
  public readonly specialShowing: boolean
}